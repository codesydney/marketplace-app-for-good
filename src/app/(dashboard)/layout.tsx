import React from 'react'
import { Flex, Box } from '@radix-ui/themes'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/header/Header'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }
  return (
    <section className="w-full">
      <Flex>
        <Sidebar />
        <Box className="flex w-full flex-col">
          <Header />
          <main>{children}</main>
        </Box>
      </Flex>
    </section>
  )
}
