import { Database } from "../../types/supabase";

export type SupabaseInsertWebhookEvent<
  TTable extends keyof Database["public"]["Tables"]
> = {
  type: "INSERT";
  table: TTable;
  record: Database["public"]["Tables"][TTable]["Row"];
  schema: "public";
  old_record: null;
};
