"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
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

const MainContainerStyles = { height: "90vh" };

const conversations = [
  {
    lastMessage: "Yes i can do it for you",
    lastSenderName: "Lilly",
    name: "Lilly",
    avatar: "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg",
    status: "available",
  },
  {
    lastMessage: "Yes i can do it for you",
    lastSenderName: "Joe",
    name: "Joe",
    avatar: "https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg",
    status: "dnd",
  },
  {
    lastMessage: "Yes i can do it for you",
    lastSenderName: "Emily",
    name: "Emily",
    avatar: "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg",
    status: "available",
  },
];

const messages = [
  {
    model: {
      direction: "incoming",
      message: "Hello my friend",
      position: "single",
      sender: "Lily",
      sentTime: "15 mins ago",
    },
    showAvatar: true,
  },
  {
    model: {
      direction: "outgoing",
      message: "Hello my friend",
      position: "single",
      sender: "Joe",
      sentTime: "15 mins ago",
    },
    showAvatar: true,
  },
  {
    model: {
      direction: "incoming",
      message: "Hello my friend",
      position: "single",
      sender: "Lily",
      sentTime: "15 mins ago",
    },
    showAvatar: true,
  },
  {
    model: {
      direction: "outgoing",
      message: "Hello my friend",
      position: "single",
      sender: "Joe",
      sentTime: "15 mins ago",
    },
    showAvatar: false,
  },
  {
    model: {
      direction: "outgoing",
      message: "Hello my friend",
      position: "single",
      sender: "Joe",
      sentTime: "15 mins ago",
    },
    showAvatar: true,
  },
] as const;

export const MessagesContainer = () => {
  const supabase = createClient();
  const [threads, setThreads] = useState<any>();
  const [serviceProvider, setServiceProvider] = useState<any>();

  useEffect(() => {
    // const query = async () => {
    //   const { data, error } = await supabase.auth.getUser();
    //   if (!error && data) {
    //     const serviceProvider = await getServiceProvider(
    //       data.user.id,
    //       supabase
    //     );
    //     const threads = await getServiceProviderThreads(data.user.id, supabase);
    //     setServiceProvider(serviceProvider);
    //     setThreads(threads);
    //   }
    // };
    // query();
  }, [supabase, threads, serviceProvider]);

  return (
    <MainContainer responsive style={MainContainerStyles}>
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {conversations.map((item) => (
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
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name="Zoe"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Zoe"
          />
          <ConversationHeader.Actions>
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          <MessageSeparator content="Saturday, 30 November 2019" />
          {messages.map((item) => (
            <Message key={item.model.sender} model={item.model}>
              {item.showAvatar && (
                <Avatar
                  name="Zoe"
                  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                />
              )}
            </Message>
          ))}
        </MessageList>
        <MessageInput placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
  );
};
