export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          preferred_name: string;
          profile_picture: string | null;
          user_id: string;
        };
        Insert: {
          preferred_name: string;
          profile_picture?: string | null;
          user_id: string;
        };
        Update: {
          preferred_name?: string;
          profile_picture?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "customers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          content: string;
          id: number;
          recipient_id: string;
          sender_id: string;
          sent_at: string;
          status: string;
          thread_id: string;
        };
        Insert: {
          content: string;
          id?: number;
          recipient_id: string;
          sender_id: string;
          sent_at?: string;
          status?: string;
          thread_id: string;
        };
        Update: {
          content?: string;
          id?: number;
          recipient_id?: string;
          sender_id?: string;
          sent_at?: string;
          status?: string;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "threads";
            referencedColumns: ["id"];
          }
        ];
      };
      quotes: {
        Row: {
          id: string;
          service_provider_id: string;
        };
        Insert: {
          id: string;
          service_provider_id: string;
        };
        Update: {
          id?: string;
          service_provider_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quotes_service_provider_id_fkey";
            columns: ["service_provider_id"];
            isOneToOne: false;
            referencedRelation: "service_providers";
            referencedColumns: ["user_id"];
          }
        ];
      };
      service_providers: {
        Row: {
          preferred_name: string;
          profile_picture: string | null;
          user_id: string;
        };
        Insert: {
          preferred_name: string;
          profile_picture?: string | null;
          user_id: string;
        };
        Update: {
          preferred_name?: string;
          profile_picture?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_providers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tasks: {
        Row: {
          customer_id: string;
          id: string;
        };
        Insert: {
          customer_id: string;
          id: string;
        };
        Update: {
          customer_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["user_id"];
          }
        ];
      };
      threads: {
        Row: {
          created_at: string;
          customer_id: string;
          id: string;
          service_provider_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          id: string;
          service_provider_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          id?: string;
          service_provider_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "threads_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "threads_service_provider_id_fkey";
            columns: ["service_provider_id"];
            isOneToOne: false;
            referencedRelation: "service_providers";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
