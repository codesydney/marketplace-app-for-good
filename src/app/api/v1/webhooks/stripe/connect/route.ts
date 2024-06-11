import to from 'await-to-js'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { stripe } from '@/server/services/stripe'
import { logger } from '@/server/lib/logger'
import { createAdminClient } from '@/utils/supabase/serverAdmin'

const endpointSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET

if (!endpointSecret)
  throw new Error('STRIPE_CONNECT_WEBHOOK_SECRET env var is not set')

export const POST = async (req: Request) => {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  const [err, event] = await to(
    stripe.webhooks.constructEventAsync(body, signature, endpointSecret),
  )

  if (err) {
    return NextResponse.json(
      { success: false, message: `Webhook Error: ${err.message}` },
      { status: 400 },
    )
  }

  if (event.type !== 'account.updated') {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const account = event.data.object

  if (!account.details_submitted) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const userId = account.metadata?.userId

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User not found in Stripe Account metadata' },
      { status: 500 },
    )
  }

  const supabase = createAdminClient()

  const { error } = await supabase.rpc('update_service_provider_onboarding', {
    p_user_id: userId,
    p_onboarding_status: true,
  })

  if (error) {
    logger.debug({ userId, error }, 'Failed to update onboarding status')
    return NextResponse.json({ success: false }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
