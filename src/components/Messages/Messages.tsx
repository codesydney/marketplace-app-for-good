"use client";

import { getServiceProvider, getServiceProviderThreads } from "./queries";
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
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const MainContainerStyles = { height: "90vh" };

export const MessagesContainer = () => {
  const supabase = createClient();
  const [threads, setThreads] = useState<any>();
  const [serviceProvider, setServiceProvider] = useState<any>();

  useEffect(() => {
    const query = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data) {
        const serviceProvider = await getServiceProvider(
          data.user.id,
          supabase
        );

        const threads = await getServiceProviderThreads(data.user.id, supabase);

        setServiceProvider(serviceProvider);
        setThreads(threads);
      }
    };

    query();
  }, [supabase, threads, serviceProvider]);

  return (
    <MainContainer responsive style={MainContainerStyles}>
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Lilly"
            name="Lilly"
          >
            <Avatar
              name="Lilly"
              src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
              status="available"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Joe"
            name="Joe"
          >
            <Avatar
              name="Joe"
              src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
              status="dnd"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Emily"
            name="Emily"
            unreadCnt={3}
          >
            <Avatar
              name="Emily"
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
              status="available"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Kai"
            name="Kai"
            unreadDot
          >
            <Avatar
              name="Kai"
              src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
              status="unavailable"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Akane"
            name="Akane"
          >
            <Avatar
              name="Akane"
              src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
              status="eager"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Eliot"
            name="Eliot"
          >
            <Avatar
              name="Eliot"
              src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
              status="away"
            />
          </Conversation>
          <Conversation
            active
            info="Yes i can do it for you"
            lastSenderName="Zoe"
            name="Zoe"
          >
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
              status="dnd"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Patrik"
            name="Patrik"
          >
            <Avatar
              name="Patrik"
              src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
              status="invisible"
            />
          </Conversation>
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
            <VoiceCallButton />
            <VideoCallButton />
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          <MessageSeparator content="Saturday, 30 November 2019" />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "single",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            avatarSpacer
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "single",
              sender: "Patrik",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "normal",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "first",
              sender: "Patrik",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sender: "Patrik",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "normal",
              sender: "Patrik",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "outgoing",
              message: "Hello my friend",
              position: "last",
              sender: "Patrik",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "first",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          />
          <Message
            model={{
              direction: "incoming",
              message: "Hello my friend",
              position: "last",
              sender: "Zoe",
              sentTime: "15 mins ago",
            }}
          >
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
        </MessageList>
        <MessageInput placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
  );
};
