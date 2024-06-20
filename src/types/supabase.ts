export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          country: string
          id: string
          postcode: string
          suburb: string
          user_id: string
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          country: string
          id?: string
          postcode: string
          suburb: string
          user_id: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          country?: string
          id?: string
          postcode?: string
          suburb?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'addresses_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          fullname: string
          preferred_name: string
          profile_picture: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fullname: string
          preferred_name: string
          profile_picture?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          fullname?: string
          preferred_name?: string
          profile_picture?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'customers_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      service_providers: {
        Row: {
          abn: string
          acn: string | null
          company_name: string
          cover_image_url: string | null
          created_at: string | null
          fullname: string
          industry: string
          onboarding_status: boolean
          preferred_name: string
          profile_image_url: string | null
          slug: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          abn: string
          acn?: string | null
          company_name: string
          cover_image_url?: string | null
          created_at?: string | null
          fullname: string
          industry: string
          onboarding_status?: boolean
          preferred_name: string
          profile_image_url?: string | null
          slug: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          abn?: string
          acn?: string | null
          company_name?: string
          cover_image_url?: string | null
          created_at?: string | null
          fullname?: string
          industry?: string
          onboarding_status?: boolean
          preferred_name?: string
          profile_image_url?: string | null
          slug?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'service_providers_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      stripe_users: {
        Row: {
          created_at: string | null
          id: string
          onboarded: boolean
          type: Database['public']['Enums']['user_type_enum']
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          onboarded?: boolean
          type: Database['public']['Enums']['user_type_enum']
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          onboarded?: boolean
          type?: Database['public']['Enums']['user_type_enum']
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'stripe_users_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      task_categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          address_id: string
          budget: number
          created_at: string | null
          customer_id: string
          description: string
          due_date: string
          due_date_type: Database['public']['Enums']['task_due_date_type_enum']
          id: string
          postcode: string
          status: Database['public']['Enums']['task_status_enum']
          suburb: string
          task_category_id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          address_id: string
          budget: number
          created_at?: string | null
          customer_id: string
          description: string
          due_date: string
          due_date_type?: Database['public']['Enums']['task_due_date_type_enum']
          id?: string
          postcode: string
          status?: Database['public']['Enums']['task_status_enum']
          suburb: string
          task_category_id: number
          title: string
          updated_at?: string | null
        }
        Update: {
          address_id?: string
          budget?: number
          created_at?: string | null
          customer_id?: string
          description?: string
          due_date?: string
          due_date_type?: Database['public']['Enums']['task_due_date_type_enum']
          id?: string
          postcode?: string
          status?: Database['public']['Enums']['task_status_enum']
          suburb?: string
          task_category_id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tasks_address_id_fkey'
            columns: ['address_id']
            isOneToOne: false
            referencedRelation: 'addresses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tasks_customer_id_fkey'
            columns: ['customer_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tasks_task_category_id_fkey'
            columns: ['task_category_id']
            isOneToOne: false
            referencedRelation: 'task_categories'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_service_provider_onboarding: {
        Args: {
          p_user_id: string
          p_onboarding_status: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      task_due_date_type_enum: 'ON_DATE' | 'BEFORE_DATE'
      task_status_enum: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
      user_type_enum: 'SERVICE_PROVIDER' | 'CUSTOMER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
