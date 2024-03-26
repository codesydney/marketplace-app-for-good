export * from "./supabase-generated";
import { Database } from "./supabase-generated";

type Row<TTable extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TTable]["Row"];

export type Message = Row<"messages">;
export type ServiceProvider = Row<"service_providers">;
export type Customer = Row<"customers">;
