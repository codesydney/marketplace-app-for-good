import to from 'await-to-js'
import { NextResponse } from 'next/server'

import { validateStripeAccount, validateStripeUser } from './validation'
import { stripe } from '@/server/services/stripe'
import { createClient } from '@/utils/supabase/server'

/**
 * GET /api/v1/service-providers/stripe/authorize
 *
 * Redirects a Service Provider user to the Stripe Connect onboarding page.
 * If the user has already been onboarded, this returns a 409 Conflict instead.
 */
export const GET = async (): Promise<NextResponse> => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const { data: stripeUser, error } = await supabase
    .from('stripe_users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  const stripeUserValidation = validateStripeUser(stripeUser)

  if (!stripeUserValidation.success) {
    return NextResponse.json(
      { success: false },
      { status: stripeUserValidation.status },
    )
  }

  const account = await stripe.accounts.retrieve(stripeUser.id)

  const stripeAccountValidation = validateStripeAccount(account)

  if (!stripeAccountValidation.success) {
    return NextResponse.json(
      { success: false },
      { status: stripeUserValidation.status },
    )
  }

  const [accountLinkError, accountLink] = await to(
    createStripeConnectAccountLink(stripeUser.id),
  )

  if (accountLinkError) {
    return NextResponse.json(
      { success: false, error: accountLinkError },
      { status: 500 },
    )
  }

  return NextResponse.redirect(accountLink.url)
}

export async function createStripeConnectAccountLink(accountId: string) {
  if (!process.env.STRIPE_RETURN_URL || !process.env.STRIPE_REFRESH_URL)
    throw new Error('STRIPE_RETURN_URL or STRIPE_REFRESH_URL not set')

  return await stripe.accountLinks.create({
    account: accountId,
    return_url: process.env.STRIPE_RETURN_URL,
    refresh_url: process.env.STRIPE_REFRESH_URL,
    type: 'account_onboarding',
    collect: 'eventually_due',
  })
}
