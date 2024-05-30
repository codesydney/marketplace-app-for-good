import { NextResponse } from 'next/server'
import to from 'await-to-js'
import { AuthError, PostgrestError } from '@supabase/supabase-js'
import { ZodError } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { customerSignupFormSchema } from '@/types/forms'
import { stripe } from '@/server/services/stripe'

type Response =
  | {
      success: boolean
      message?: string
    }
  | {
      success: false
      message: string
      error: Error
    }

export const POST = async (req: Request): Promise<NextResponse<Response>> => {
  const { error } = await handleCustomerSignup(req)

  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, message: error.message, error },
      { status: 400 },
    )
  }

  if (error instanceof AuthError) {
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
    return NextResponse.json(
      { success: false, message: error.message, error },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}

async function handleCustomerSignup(
  req: Request,
): Promise<
  | { success: false; error: Error | PostgrestError }
  | { success: true; error: null }
> {
  const supabase = createClient()

  const validationResult = customerSignupFormSchema.safeParse(
    await req.formData(),
  )

  if (validationResult.success === false) {
    return { success: false, error: validationResult.error }
  }

  const {
    email,
    password,
    preferred_name: preferredName,
    fullname,
  } = validationResult.data

  const [error, data] = await to(
    stripe.customers.create({
      email,
      name: fullname,
    }),
  )

  if (error) {
    return { success: false, error }
  }

  const stripeCustomer = data

  const signupResult = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'customer',
        customer_id: stripeCustomer.id,
        onboarded: true,
        preferred_name: preferredName,
        fullname,
      },
    },
  })

  if (signupResult.error) {
    return { success: false, error: signupResult.error }
  }

  const userId = signupResult.data?.user?.id as string

  const customerInsertResult = await supabase
    .from('customers')
    .insert([{ user_id: userId, preferred_name: preferredName, fullname }])

  if (customerInsertResult.error) {
    return {
      success: false,
      error: customerInsertResult.error,
    }
  }

  return { success: true, error: null }
}
