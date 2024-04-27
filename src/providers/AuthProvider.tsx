'use client'

import React, { useEffect, ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, fetchUser } = useUserStore(state => state)

  useEffect(() => {
    const getUser = async () => {
      await fetchUser()
    }

    getUser()
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return redirect('/sign-in')
  }

  return <>{children}</>
}

export default AuthProvider
