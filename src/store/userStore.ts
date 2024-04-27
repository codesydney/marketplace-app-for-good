import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'

type UserStore = {
  user: any // This can be a specific type if you have a user model
  isAuthenticated: boolean // True if user is authenticated
  fetchUser: () => Promise<void>
  signOut: () => Promise<void>
}

const supabase = createClient()

export const useUserStore = create<UserStore>(set => ({
  user: null,
  isAuthenticated: false,

  fetchUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error.message)
      set({ user: null, isAuthenticated: false })
    } else {
      set({ user, isAuthenticated: !!user })
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error during sign out:', error.message)
      return
    }
    set({ user: null, isAuthenticated: false })
  },
}))
