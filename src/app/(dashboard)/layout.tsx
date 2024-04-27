import React from 'react'
import { Flex, Box } from '@radix-ui/themes'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/header/Header'
import ToasterProvider from '@/providers/ToasterProvider'
import AuthProvider from '@/providers/AuthProvider'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
