import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { User } from '@/lib/services'
import { setAuthTokens, clearAuth } from '@/lib/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User) => void
  setTokens: (access: string, refresh: string) => void
  logout: () => void
  setLoading: (v: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setTokens: (access, refresh) => {
        setAuthTokens(access, refresh)
        set({ isAuthenticated: true })
      },

      logout: () => {
        clearAuth()
        set({ user: null, isAuthenticated: false })
      },

      setLoading: (v) => set({ isLoading: v }),
    }),
    {
      name: 'pipstrust-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
