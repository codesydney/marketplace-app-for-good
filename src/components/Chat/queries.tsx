import { SupabaseClient, createClient } from "@/utils/supabase/client";
import {
  transformThreadsToChatConversations,
  transformMessagesToChatMessages,
} from "./mappers";

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

export type ServiceProviderThreadsResult = Awaited<
  ReturnType<typeof getServiceProviderThreads>
>;

export type ServiceProviderThreads = NonNullable<
  ServiceProviderThreadsResult["data"]
>[number];

export const getServiceProviderThreads = async (
  userId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("threads")
    .select("*, customers(*)")
    .eq("service_provider_id", userId);
};

export const getMessagesFromThread = async (
  theadId: string,
  supabaseClient: SupabaseClient
) => {
  return supabaseClient
    .from("messages")
    .select("*")
    .eq("thread_id", theadId)
    .order("sent_at", { ascending: false });
};

export async function getThreadsData(userId: string, supabase: SupabaseClient) {
  const { data, error } = await getServiceProviderThreads(userId, supabase);

  if (error) {
    return Promise.reject(error);
  }

  return {
    error: null,
    data: data?.map(transformThreadsToChatConversations),
  };
}

export async function getMessageData(threadId: string) {
  const supabase = createClient();

  const userResult = await supabase.auth.getUser();

  if (userResult.error) {
    return Promise.reject(userResult.error);
  }

  const userId = userResult.data.user.id;

  const { data, error } = await getMessagesFromThread(threadId, supabase);

  if (error) {
    return Promise.reject(error);
  }

  return {
    error: null,
    data: data?.map((item) => transformMessagesToChatMessages(userId, item)),
  };
}
