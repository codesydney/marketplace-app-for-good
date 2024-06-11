import { NextResponse } from 'next/server'
import { AuthError, PostgrestError } from '@supabase/supabase-js'
import to from 'await-to-js'
import Stripe from 'stripe'
import { ZodError } from 'zod'

import { SignupResponse } from '../../customers/sign-up/route'
import { serviceProviderSignupFormSchema } from '@/types/forms'
import { logger } from '@/server/lib/logger'
import { stripe } from '@/server/services/stripe'
import { createClient } from '@/utils/supabase/server'

/**
 * This function handles error and success responses for the Service Provider sign-up route.
 * See the handleServiceProviderSignup function for the main logic.
 */
export const POST = async (
  req: Request,
): Promise<NextResponse<SignupResponse>> => {
  const { error } = await handleServiceProviderSignup(req)

  if (error instanceof ZodError) {
    logger.error({ error }, 'Service Providers Signup: Input Validation Error')
    return NextResponse.json(
      { success: false, message: error.message, error },
      { status: 400 },
    )
  }

  if (error instanceof AuthError) {
    logger.error({ error }, 'Service Providers Signup: Supabase Auth Error')
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error,
      },
      { status: error.status },
    )
  }

  if (error) {
    logger.error({ error }, 'Service Providers Signup: Error')
    return NextResponse.json(
      { success: false, message: error.message, error },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}

/**
 * Handles the signup form for our Service Provider users.
 */
async function handleServiceProviderSignup(
  req: Request,
): Promise<
  | { success: false; error: Error | PostgrestError }
  | { success: true; error: null }
> {
  const supabase = createClient()

  const validationResult = serviceProviderSignupFormSchema.safeParse(
    await req.formData(),
  )

  if (validationResult.success === false) {
    return { success: false, error: validationResult.error }
  }

  const {
    email,
    password,
    company_name: companyName,
    abn,
    acn,
    industry,
    preferred_name: preferredName,
    fullname,
  } = validationResult.data

  // sign up new user
  const metadata = {
    role: 'service-provider',
    onboarded: false,
    preferred_name: preferredName,
  }

  const signupResult = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })

  if (signupResult.error) {
    return { success: false, error: signupResult.error }
  }

  const userId = signupResult.data?.user?.id as string

  // new service provider
  const insertServiceProviderResult = await supabase
    .from('service_providers')
    .insert([
      {
        user_id: userId,
        company_name: companyName,
        abn,
        acn,
        industry,
        preferred_name: preferredName,
        fullname,
        slug: slugify(companyName),
        onboarding_status: false,
      },
    ])

  if (insertServiceProviderResult.error) {
    return {
      success: false,
      error: insertServiceProviderResult.error,
    }
  }

  // create new stripe account
  const [stripeAccountError, stripeAccount] = await to(
    createStripeConnectAccount({
      userId,
      email,
    }),
  )

  if (stripeAccountError) {
    return { success: false, error: stripeAccountError }
  }

  const serviceProviderId = stripeAccount.id

  const insertStripeUsersResult = await supabase.from('stripe_users').insert({
    id: serviceProviderId,
    user_id: userId,
    type: 'SERVICE_PROVIDER',
    onboarded: false,
  })

  if (insertStripeUsersResult.error) {
    return { success: false, error: insertStripeUsersResult.error }
  }

  return { success: true, error: null }
}

export type CreateStripeConnectAccountParams = {
  userId: string
  email: string
  companyType?: 'sole_proprietorship'
}

export async function createStripeConnectAccount(
  params: CreateStripeConnectAccountParams,
) {
  const accountParams: Stripe.AccountCreateParams = {
    type: 'express',
    business_type: 'company',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    company: {
      structure: params?.companyType ?? 'sole_proprietorship',
    },
    email: params.email,

    metadata: { userId: params.userId },
  }

  return await stripe.accounts.create(accountParams)
}

/**
 * Slugifies a string.
 * @param s
 * @returns The slugified string.
 */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100)
}
