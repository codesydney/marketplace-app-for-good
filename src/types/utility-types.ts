import { Database } from './supabase'

export type DatabaseRecord<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Task = DatabaseRecord<'tasks'>
