import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { redirect } from "next/navigation";
import { Heading, Flex, Section } from "@radix-ui/themes";

import { createClient } from "@/utils/supabase/server";
import { Chat } from "@/components/Chat";

const MessagesPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="min-h-screen w-full">
      <Flex direction="column" gap="4">
        <Heading as="h1">Messages</Heading>
        <Chat />
      </Flex>
    </div>
  );
};

export default MessagesPage;
