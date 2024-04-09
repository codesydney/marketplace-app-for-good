import { ThreadResult } from "@/components/Chat/queries";
import { Message } from "@/types/supabase";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Define the type for the chat state
type ChatState = {
  activeThreadId: string | null;
  threads: Record<ThreadResult["id"], ThreadResult>;
  messages: Record<Message["thread_id"], Record<Message["id"], Message>>;
};

type ChatActions = {
  setActiveThread: (threadId: string) => void;
  updateThreads: (threads: ThreadResult[]) => void;
  updateMessages: (messages: Message[]) => void;
};

export const useChatStore = create<ChatState & ChatActions>()(
  immer((set) => ({
    activeThreadId: null,
    threads: {},
    messages: {},
    setActiveThread: (threadId) => {
      set((state: ChatState) => {
        state.activeThreadId = threadId;
      });
    },
    updateThreads: (threads) => {
      set((state: ChatState) => {
        for (const thread of threads) {
          state.threads[thread.id] = thread;
        }
      });
    },
    updateMessages: (messages) => {
      set((state: ChatState) => {
        for (const message of messages) {
          if (!state.messages[message.thread_id]) {
            state.messages[message.thread_id] = {};
          }

          state.messages[message.thread_id][message.id] = message;
        }
      });
    },
  }))
);

export const useActiveThread = () => {
  const activeThreadId = useChatStore((state) => state.activeThreadId);
  const threads = useChatStore((state) => state.threads);

  if (!activeThreadId) {
    return null;
  }

  return threads[activeThreadId];
};
