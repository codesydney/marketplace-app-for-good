import { SupabaseClient, createClient } from "@/utils/supabase/client";
import {
  transformThreadsToChatConversations,
  transformMessagesToChatMessages,
} from "./mappers";
import { PostgrestError, User } from "@supabase/supabase-js";

export const isCustomer = (user: User) =>
  user.user_metadata.roles.customer === true;
export const isServiceProvider = (user: User) =>
  user.user_metadata.roles.service_provider === true;

export const getUserChatProfile = async (
  user: User,
  supabaseClient: SupabaseClient
) => {
  if (isServiceProvider(user))
    return getServiceProvider(user.id, supabaseClient);

  return getCustomer(user.id, supabaseClient);
};

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

export type CustomerThreadsResult = Awaited<
  ReturnType<typeof getCustomerThreads>
>;

export type CustomerThread = NonNullable<CustomerThreadsResult["data"]>[number];

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

export type ServiceProviderThread = NonNullable<
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
  return supabaseClient.from("messages").select("*").eq("thread_id", theadId);
};

export async function getThreadsData(user: User, supabase: SupabaseClient) {
  const threads = isCustomer(user)
    ? await getCustomerThreads(user.id, supabase)
    : await getServiceProviderThreads(user.id, supabase);

  if (threads.error) {
    return threads;
  }

  return {
    error: null,
    data: threads.data?.map(transformThreadsToChatConversations),
  };
}

export async function getMessageData(userId: string, threadId: string) {
  const supabase = createClient();
  const messages = await getMessagesFromThread(threadId, supabase);

  if (messages.error) {
    return messages;
  }

  return {
    error: null,
    data: messages.data?.map((item) =>
      transformMessagesToChatMessages(userId, item)
    ),
  };
}

/**
 * Wraps errors returned as values in a rejected promise, otherwise returns the data.
 * Used to make supabase results compatible with tanstack-query functions
 */
export async function handleErrorUnion<TData>({
  data,
  error,
}:
  | { error: PostgrestError; data: null }
  | {
      error: null;
      data: TData;
    }) {
  if (error) {
    return Promise.reject(error);
  }

  return data;
}
