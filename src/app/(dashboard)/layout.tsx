import React from 'react'
import { Flex, Box } from '@radix-ui/themes'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/header/Header'
import { createClient } from '@/utils/supabase/server'
import ToasterProvider from '@/providers/ToasterProvider'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

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
        <Box className="flex w-full flex-col gap-2">
          <Header />
          <main>{children}</main>
        </Box>
      </Flex>
      <ToasterProvider />
    </section>
  )
}
