import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'

export function useSessionQuery() {
  const supabase = createClient()
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () =>
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) throw error
        return data
      }),
  })
}
