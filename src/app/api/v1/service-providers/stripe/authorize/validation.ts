import Stripe from 'stripe'
import { Database } from '@/types/supabase'

export type StripeUser = Database['public']['Tables']['stripe_users']['Row']

export function validateStripeUser(user: StripeUser) {
  if (user.type !== 'SERVICE_PROVIDER') {
    return { success: false, status: 403 } as const
  }

  if (user.onboarded) {
    return { success: false, status: 409 } as const
  }

  return { success: true } as const
}

export function validateStripeAccount(
  account: Pick<
    Stripe.Account,
    'id' | 'object' | 'email' | 'details_submitted'
  >,
) {
  if (account.details_submitted) {
    return { success: false, status: 409 } as const
  }

  return { success: true } as const
}
