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
  Message as ChatMessage,
  MessageInput,
  UserStatus,
} from "@chatscope/chat-ui-kit-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMessageData,
  getThreadsData,
  getUserChatProfile,
  handleErrorUnion,
  isServiceProvider,
} from "./queries";
import { memo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ServiceProvider, Customer, Message } from "@/types/supabase";
import { User } from "@supabase/supabase-js";

const MainContainerStyles = { height: "90vh" };

export type Conversation = {
  serviceProviderId: string;
  customerId: string;
  threadId: string;
  lastMessage: string;
  lastSenderName: string;
  name: string;
  avatar: string;
  status: UserStatus;
};

export type ChatMessage = {
  model: {
    id: string;
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

  const [activeConversation, setActiveConversation] = useState<Conversation>();

  const { data: user, error: userError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return Promise.reject(error);
      }

      return data.session?.user;
    },
  });

  const {
    data: userProfileData,
    isLoading: isUserProfileLoading,
    error: userProfileError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserChatProfile(user!, supabase).then(handleErrorUnion),
    enabled: !!user,
  });

  const {
    data: threadsData,
    isLoading: areThreadsLoading,
    error: threadsError,
  } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreadsData(user!, supabase).then(handleErrorUnion),
    enabled: !!user,
  });

  if (!threadsData) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer responsive style={MainContainerStyles}>
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {threadsData?.map((item) => (
            <Conversation
              key={item.name}
              info={item.lastMessage}
              name={item.name}
              onClick={() => setActiveConversation(item)}
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
      {userProfileData && activeConversation && (
        <MessagesMemo
          conversation={activeConversation}
          userDetails={userProfileData}
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
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: messagesData,
    isLoading: areMessagesLoading,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () =>
      getMessageData(userDetails.user_id, conversation.threadId).then(
        handleErrorUnion
      ),
  });

  const handleSend = async (text: string) => {
    const user = queryClient.getQueryData<User>(["user"]);

    if (!user) {
      // todo handle user not logged in
      return;
    }

    const message: Omit<Message, "id" | "status"> = {
      content: text,
      recipient_id: conversation.customerId,
      sender_id: userDetails.user_id,
      sent_at: new Date().toISOString(),
      thread_id: conversation.threadId,
    };

    if (isServiceProvider(user)) {
      message.sender_id = userDetails.user_id;
      message.recipient_id = conversation.customerId;
    }

    await supabase.from("messages").insert([message]);
  };

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
        {messagesData?.map((item) => (
          <ChatMessage key={item.model.sender} model={item.model}>
            {item.showAvatar && item.isUser && (
              <Avatar
                name={userDetails.preferred_name}
                src={userDetails.profile_picture ?? ""}
              />
            )}
            {item.showAvatar && !item.isUser && (
              <Avatar name={conversation.name} src={conversation.avatar} />
            )}
          </ChatMessage>
        ))}
      </MessageList>
      <MessageInput placeholder="Type message here" onSend={handleSend} />
    </ChatContainer>
  );
};

const MessagesMemo = memo(Messages);
