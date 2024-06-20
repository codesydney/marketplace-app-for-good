'use client'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

/**
 * This contains all top-level providers for the app such as the Radix UI ThemeProvider and the React Query QueryClientProvider.
 */
export function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Theme>
  )
}
