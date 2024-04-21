import { HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import { Box, Button } from '@radix-ui/themes'
import React from 'react'

export default function Header() {
  return (
    <nav className=" w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <Box className="px-3 py-3 lg:px-5 lg:pl-3">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center justify-start rtl:justify-end">
            <Button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <HamburgerMenuIcon />
            </Button>
          </Box>
          <div className="flex items-center">
            <div className="ms-3 flex items-center">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 p-2 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <PersonIcon />
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </nav>
  )
}
