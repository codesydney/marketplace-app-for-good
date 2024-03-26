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
    .select("*, other_user:service_providers(*)")
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
    .select("*, other_user:customers(*)")
    .eq("service_provider_id", userId);
};

export const getMessagesFromThread = async (
  theadId: string,
  supabaseClient: SupabaseClient,
  options?: {
    last_message_id?: number;
  }
) => {
  if (options?.last_message_id) {
    return supabaseClient
      .from("messages")
      .select("*")
      .eq("thread_id", theadId)
      .gt("id", options?.last_message_id);
  }

  return supabaseClient.from("messages").select("*").eq("thread_id", theadId);
};

export async function getThreads(user: User, supabase: SupabaseClient) {
  const threads = isCustomer(user)
    ? await getCustomerThreads(user.id, supabase)
    : await getServiceProviderThreads(user.id, supabase);

  if (threads.error) {
    return threads;
  }

  return {
    error: null,
    data: threads.data,
  };
}

export async function getMessageData(params: {
  user_id: string;
  thread_id: string;
  last_message_id?: number;
}) {
  const supabase = createClient();
  const messages = await getMessagesFromThread(params.thread_id, supabase, {
    last_message_id: params?.last_message_id,
  });

  if (messages.error) {
    return messages;
  }

  return {
    error: null,
    data: messages.data,
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
