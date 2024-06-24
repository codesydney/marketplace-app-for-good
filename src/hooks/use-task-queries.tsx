'use client'

import { useQuery } from '@tanstack/react-query'
import { TaskQueryOptions, TasksRepository } from '@/data/tasks'

export function useCustomerTasksQuery(
  userId: string | undefined,
  options?: TaskQueryOptions,
) {
  return useQuery({
    queryKey: ['cuustomer-tasks'],
    queryFn: () => TasksRepository.getCustomerTasks(userId!, options),
    enabled: !!userId,
  })
}

export function useTaskListingsQuery(options?: TaskQueryOptions) {
  return useQuery({
    queryKey: ['listings'],
    queryFn: () => TasksRepository.getTaskListings(options),
  })
}
