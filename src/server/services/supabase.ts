import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client with the Service role.
 * This role has the ability to bypass Row Level Security.
 * Use this client wisely and never expose it to the client side.
 */
export const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
);
