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
  getThreads,
  getUserChatProfile,
  handleErrorUnion,
  isServiceProvider,
} from "./queries";
import { memo } from "react";
import { createClient } from "@/utils/supabase/client";
import { ServiceProvider, Customer, Message } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useChatStore } from "@/hooks/ChatStore";

const MainContainerStyles = { height: "90vh" };

export const Chat = () => {
  const supabase = createClient();
  const {
    threads,
    updateThreads,
    updateMessages,
    activeThread,
    setActiveThread,
  } = useChatStore();

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
    isSuccess: threadQuerySuccess,
    isLoading: areThreadsLoading,
    error: threadsError,
  } = useQuery({
    queryKey: ["threads"],
    queryFn: () =>
      getThreads(user!, supabase)
        .then(handleErrorUnion)
        .then((data) => {
          updateThreads(data);
          return data; // returning this allows data to be seen in the React DevTools
        }),
    enabled: !!user,
  });

  const { isLoading: areMessagesLoading, error: messagesError } = useQuery({
    queryKey: ["messages"],
    queryFn: async () =>
      await getMessageData({
        user_id: userProfileData?.user_id!,
        thread_id: activeThread!,
      })
        .then(handleErrorUnion)
        .then((data) => {
          updateMessages(data);
          return data; // returning this allows data to be seen in the React DevTools
        }),
    enabled: threadQuerySuccess && !!activeThread && !!userProfileData,
  });

  supabase
    .channel("threads")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "threads" },
      (payload) => {
        console.log("Change received!");
        console.log({ payload });
      }
    )
    .subscribe();

  return (
    <MainContainer responsive style={MainContainerStyles}>
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {Object.values(threads).map((thread) => (
            <Conversation
              key={thread.customer_id}
              info={thread.last_message_id}
              name={thread.other_user?.preferred_name}
              onClick={() => setActiveThread(thread.id)}
            >
              <Avatar
                name={thread.other_user?.preferred_name}
                src={thread.other_user?.profile_picture ?? ""}
              />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
      {userProfileData && activeThread && (
        <MessagesMemo userDetails={userProfileData} />
      )}
    </MainContainer>
  );
};

const Messages = ({
  userDetails,
}: {
  userDetails: ServiceProvider | Customer;
}) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const activeThread = useChatStore((state) => {
    if (!state.activeThread) {
      return null;
    }

    return state.threads[state.activeThread];
  });

  const messages = useChatStore((state) => {
    if (activeThread) {
      return state.messages[activeThread.id];
    }
  });

  const handleSend = async (text: string) => {
    const user = queryClient.getQueryData<User>(["user"]);

    if (!user) {
      // todo handle user not logged in
      return;
    }

    if (!activeThread) {
      // todo handle null active thread
      return;
    }

    const message: Omit<Message, "id" | "status"> = {
      content: text,
      recipient_id: activeThread.customer_id,
      sender_id: userDetails.user_id,
      sent_at: new Date().toISOString(),
      thread_id: activeThread.id,
    };

    if (isServiceProvider(user)) {
      message.sender_id = userDetails.user_id;
      message.recipient_id = activeThread.customer_id;
    }

    await supabase.from("messages").insert([message]);

    queryClient.invalidateQueries({ queryKey: ["messages"] });
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          name={activeThread?.other_user?.preferred_name}
          src={activeThread?.other_user?.profile_picture ?? ""}
        />
        <ConversationHeader.Content
          info="Active 10 mins ago"
          userName={activeThread?.other_user?.preferred_name}
        />
        <ConversationHeader.Actions>
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
      // typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
        {messages &&
          Object.values(messages)?.map((message) => (
            <ChatMessage
              key={message.id}
              model={{
                direction:
                  message.sender_id === userDetails.user_id
                    ? "outgoing"
                    : "incoming",
                position: "single",
                message: message.content,
                sentTime: message.sent_at,
                type: "text",
              }}
            ></ChatMessage>
          ))}
      </MessageList>
      <MessageInput placeholder="Type message here" onSend={handleSend} />
    </ChatContainer>
  );
};

const MessagesMemo = memo(Messages);
