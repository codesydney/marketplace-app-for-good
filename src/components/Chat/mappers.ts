import { MessageModel } from "@chatscope/chat-ui-kit-react";
import { Conversation } from "./Chat";
import { CustomerThread, ServiceProviderThread } from "./queries";
import { Message } from "@/types/supabase";

export const transformMessagesToChatMessages = (
  user_id: string,
  message: Message
): {
  messageId: number;
  isUser: boolean;
  showAvatar: boolean;
  model: MessageModel;
} => ({
  model: {
    direction: message.sender_id !== user_id ? "incoming" : "outgoing",
    message: message.content,
    position: "single",
    sender: message.sender_id,
    sentTime: message.sent_at,
  },
  messageId: message.id,
  showAvatar: true,
  isUser: message.sender_id === user_id,
});

function isCustomerThread(thread: any): thread is CustomerThread {
  return thread && typeof thread.service_providers !== "undefined";
}

export const transformThreadsToChatConversations = (
  thread: CustomerThread | ServiceProviderThread
): Conversation => {
  if (isCustomerThread(thread)) {
    return {
      customerId: thread.customer_id,
      serviceProviderId: thread.service_provider_id,
      threadId: thread.id,
      lastMessage: "Yes i can do it for you",
      lastSenderName: thread?.service_providers?.preferred_name ?? "",
      name: thread?.service_providers?.preferred_name ?? "",
      avatar: thread?.service_providers?.profile_picture ?? "",
      status: "available",
    };
  }

  return {
    customerId: thread.customer_id,
    serviceProviderId: thread.service_provider_id,
    threadId: thread.id,
    lastMessage: "Yes i can do it for you",
    lastSenderName: thread?.customers?.preferred_name ?? "",
    name: thread.customers?.preferred_name ?? "",
    avatar: thread.customers?.profile_picture ?? "",
    status: "available",
  };
};
