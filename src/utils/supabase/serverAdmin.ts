import { createClient } from '@supabase/supabase-js'

import { Database } from '@/types/supabase'

/**
 * Supabase client with the Service role.
 * This role has the ability to bypass Row Level Security.
 * Use this client wisely and never expose it to the client side.
 */
export const createAdminClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  )
