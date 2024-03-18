import { SupabaseClient } from "@/utils/supabase/client";

export const getServiceProvider = async (
  userId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("service_providers")
    .select("*")
    .eq("user_id", userId)
    .single();
};

export const getCustomer = async (
  userId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("customers")
    .select("*")
    .eq("user_id", userId)
    .single();
};

export const getCustomerThreads = async (
  userId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("threads")
    .select("*, service_providers(*)")
    .eq("customer_id", userId);
};

export const getServiceProviderThreads = async (
  userId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("threads")
    .select("*, customers(*)")
    .eq("service_provider_id", userId);
};
