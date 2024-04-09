import { PostgrestError } from "@supabase/supabase-js";

import { logger } from "@/server/lib/logger";
import { SupabaseInsertWebhookEvent } from "@/server/lib/supabase-utils";
import { stripe } from "@/server/services/stripe";
import { supabaseAdminClient } from "@/server/services/supabase";

type InsertUsersEvent = SupabaseInsertWebhookEvent<"users">;

/**
 * Handles webhook events when a new user is inserted into the public.users table.
 */
export async function POST(request: Request) {
  // const body: InsertUsersEvent = ExampleRequestBody;
  const body: InsertUsersEvent = await request.json();
  const userId = body.record.id;

  const result = await createStripeCustomerOnNewUser(userId);
  logger.debug(result, "Create Stripe Customer Result");

  return Response.json(null, { status: 200 });
}

type CreateCustomerResult =
  | {
      error: null;
      data: {
        customer: {
          id: string;
          stripe_customer_id: string;
        };
      };
    }
  | {
      error: Error | PostgrestError;
      data: null;
    };

/**
 * Creates a new Stripe Customer for the given user.
 * @param userId
 */
async function createStripeCustomerOnNewUser(
  userId: string
): Promise<CreateCustomerResult> {
  const authUserResult = await getAuthUserEmail(userId);
  if (authUserResult.error) {
    return authUserResult;
  }

  const email = authUserResult.data.email;

  const publicUserResult = await getPublicUser(userId);
  if (publicUserResult.error) {
    return publicUserResult;
  }
  if (publicUserResult.data?.stripe_customer_id) {
    return { error: null, data: { customer: publicUserResult.data } };
  }

  const stripeCustomerResult = await createStripeCustomer(email);
  if (stripeCustomerResult.error) {
    return stripeCustomerResult;
  }

  const customer = stripeCustomerResult.data;

  const updateResult = await updateStripeCustomerId(userId, customer.id);
  if (updateResult.error) {
    return updateResult;
  }

  return {
    error: null,
    data: {
      customer: {
        id: userId,
        stripe_customer_id: customer.id,
      },
    },
  };
}

async function getAuthUserEmail(userId: string) {
  const {
    error,
    data: { user },
  } = await supabaseAdminClient.auth.admin.getUserById(userId);

  if (error) {
    return { error, data: null };
  }

  if (!user?.email) {
    return {
      error: new Error("Email missing from auth user"),
      data: null,
    };
  }

  return { error: null, data: { email: user.email } };
}

async function getPublicUser(userId: string) {
  return supabaseAdminClient
    .from("users")
    .select(
      `id, 
      stripe_customer_id`
    )
    .eq("id", userId)
    .single();
}

async function createStripeCustomer(
  email: string
): Promise<
  | { error: Error; data: null }
  | { error: null; data: Awaited<ReturnType<typeof stripe.customers.create>> }
> {
  return stripe.customers
    .create({ email })
    .then((customer) => ({ error: null, data: customer }))
    .catch((error) => ({ error, data: null }));
}

async function updateStripeCustomerId(
  userId: string,
  stripeCustomerId: string
) {
  return supabaseAdminClient
    .from("users")
    .update({
      stripe_customer_id: stripeCustomerId,
    })
    .eq("id", userId);
}
