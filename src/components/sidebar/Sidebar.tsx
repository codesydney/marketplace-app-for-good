import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  BookmarkIcon,
  BellIcon,
  DashboardIcon,
  ExitIcon,
  PersonIcon,
} from '@radix-ui/react-icons'
import { Box, IconProps, Text } from '@radix-ui/themes'
import { createClient } from '@/utils/supabase/server'

// TODO: move the type definitions to it's own folders/files
type NavMenu = {
  label: string
  link: string
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}

const navMenu: NavMenu[] = [
  {
    label: 'dashboard',
    link: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'task',
    link: '/task',
    icon: BookmarkIcon,
  },
  {
    label: 'offer',
    link: '/offer',
    icon: BellIcon,
  },
  {
    label: 'profile',
    link: '/profile',
    icon: PersonIcon,
  },
]

export default async function Sidebar() {
  // TODO: Move this to a singleton auth service?
  async function signOut() {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/sign-in')
  }
  return (
    <aside className="h-screen w-44 -translate-x-full transition-transform sm:translate-x-0">
      <Box className="h-full  bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <Text className=" mb-5 flex items-center self-center whitespace-nowrap ps-2.5 text-xl font-semibold dark:text-white">
          Dashboard
        </Text>
        {navMenu.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.link}
              className=" flex items-center rounded-lg p-2 text-gray-900 no-underline hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <item.icon />
              <Text className="ms-3 capitalize">{item.label}</Text>
            </Link>
          )
        })}
        <form action={signOut}>
          <button className="mt-4 flex items-center rounded-lg p-2 text-gray-900 no-underline hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700">
            <ExitIcon />
            <Text className="ms-3 capitalize">Logout</Text>
          </button>
        </form>
      </Box>
    </aside>
  )
}
