import { createClient } from '@/utils/supabase/client'

export type TaskQueryOptions = {
  limit: number
  offset: number
}

const DEFAULT_QUERY_OPTIONS = {
  limit: 20,
  offset: 0,
} as const

// client side repository, do not use on the server
export class TasksRepository {
  /**
   * @param options.limit defaults to 20
   * @param options.offset defaults to 0
   * @returns a list of paginated tasks
   */
  static async getTaskListings(
    options: TaskQueryOptions = DEFAULT_QUERY_OPTIONS,
  ) {
    const supabase = createClient()

    const start = options.offset * options.limit
    const end = start + options.limit

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .range(start, end)

    // supabase returns error as a value, so we throw it so react-query can handle error cases
    if (error) throw error

    return data
  }

  /**
   * @param options.limit defaults to 20
   * @param options.offset defaults to 0
   * @returns a list of tasks belonging to the customer user
   */
  static async getCustomerTasks(
    userId: string,
    options: TaskQueryOptions = DEFAULT_QUERY_OPTIONS,
  ) {
    const supabase = createClient()

    const start = options.offset * options.limit
    const end = start + options.limit

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('customer_id', userId)
      .range(start, end)

    // throw errors for react-query
    if (error) throw error

    return data
  }
}
