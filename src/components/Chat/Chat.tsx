"use client";

import {
  Avatar,
  MainContainer,
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  MessageInput,
  UserStatus,
} from "@chatscope/chat-ui-kit-react";
import { useQuery } from "@tanstack/react-query";
import { getMessageData, getServiceProvider, getThreadsData } from "./queries";
import { memo } from "react";
import { createClient } from "@/utils/supabase/client";
import { ServiceProvider, Customer } from "@/types/supabase";

const MainContainerStyles = { height: "90vh" };

export type Conversation = {
  threadId: string;
  lastMessage: string;
  lastSenderName: string;
  name: string;
  avatar: string;
  status: UserStatus;
};

export type Messages = {
  model: {
    direction: "incoming" | "outgoing";
    message: string;
    position: "single";
    sender: string;
    sentTime: string;
  };
  messageId: number;
  showAvatar: boolean;
};

export const Chat = () => {
  const supabase = createClient();

  const { data: userId, error: userError } = useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return Promise.reject(error);
      }

      return data.session?.user.id;
    },
  });

  const {
    data: serviceProviderData,
    isLoading: isServiceProviderLoading,
    error: serviceProviderError,
  } = useQuery({
    queryKey: ["service-provider"],
    queryFn: () => getServiceProvider(userId!, supabase),
    enabled: !!userId,
  });

  const {
    data: threadsData,
    isLoading: areThreadsLoading,
    error: threadsError,
  } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreadsData(userId!, supabase),
    enabled: !!userId,
  });

  if (!threadsData) {
    return <div>Loading...</div>;
  }

  const activeConversation = threadsData.data[0];

  return (
    <MainContainer responsive style={MainContainerStyles}>
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {threadsData?.data?.map((item) => (
            <Conversation
              key={item.name}
              info={item.lastMessage}
              name={item.name}
            >
              <Avatar
                name={item.name}
                src={item.avatar}
                status={item.status as UserStatus}
              />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
      {serviceProviderData?.data && (
        <MessagesMemo
          conversation={activeConversation}
          userDetails={serviceProviderData.data}
        />
      )}
    </MainContainer>
  );
};

const Messages = ({
  conversation,
  userDetails,
}: {
  conversation: Conversation;
  userDetails: ServiceProvider | Customer;
}) => {
  const {
    data: messagesData,
    isLoading: areMessagesLoading,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => getMessageData(conversation.threadId),
  });

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar name={conversation.name} src={conversation.avatar} />
        <ConversationHeader.Content
          info="Active 10 mins ago"
          userName={conversation.name}
        />
        <ConversationHeader.Actions>
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
      // typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
        {messagesData?.data?.map((item) => (
          <Message key={item.model.sender} model={item.model}>
            {item.showAvatar && item.isUser && (
              <Avatar
                name={userDetails.preferred_name}
                src={userDetails.profile_picture ?? ""}
              />
            )}
            {item.showAvatar && !item.isUser && (
              <Avatar name={conversation.name} src={conversation.avatar} />
            )}
          </Message>
        ))}
      </MessageList>
      <MessageInput placeholder="Type message here" />
    </ChatContainer>
  );
};

const MessagesMemo = memo(Messages);
