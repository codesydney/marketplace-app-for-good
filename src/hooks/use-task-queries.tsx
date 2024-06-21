import { useQuery } from '@tanstack/react-query'
import { TasksRepository } from '@/data/tasks'

export function useCustomerTasksQuery(userId: string | undefined) {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: () => TasksRepository.getCustomerTasks(userId!),
    enabled: !!userId,
  })

  return query
}
