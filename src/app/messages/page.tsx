import { Heading, Flex, Section } from "@radix-ui/themes";
import { MessagesContainer } from "../../components/Messages/Messages";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
        <MessagesContainer />
      </Flex>
    </div>
  );
};

export default MessagesPage;
