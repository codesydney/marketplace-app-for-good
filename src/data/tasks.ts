import { createClient } from '@/utils/supabase/client'

// client side repository, do not use on the server
export class TasksRepository {
  /**
   * @returns a list of tasks belonging to the customer user
   */
  static async getCustomerTasks(userId: string) {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('customer_id', userId)

    // supabase returns error as a value, so we throw it so react-query can handle error cases
    if (error) throw error

    return data
  }
}
