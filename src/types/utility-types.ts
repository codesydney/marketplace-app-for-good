import { Database } from './supabase'

export type DatabaseRecord<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Task = DatabaseRecord<'tasks'>
export type Address = DatabaseRecord<'addresses'>

export type InsertRecord<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']