import to from 'await-to-js'
import { NextResponse } from 'next/server'

import { stripe } from '@/server/services/stripe'
import { createClient } from '@/utils/supabase/server'

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

  if (stripeUser.type !== 'SERVICE_PROVIDER') {
    return NextResponse.json({ success: false }, { status: 403 })
  }

  const account = await stripe.accounts.retrieve(stripeUser.id)

  if (stripeUser.onboarded || !account.details_submitted) {
    return NextResponse.json({ success: false }, { status: 400 })
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
