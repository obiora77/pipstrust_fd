import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

// ── Attach access token to every request ──────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Handle token refresh on 401 ───────────────────────────────────────────────
let isRefreshing = false
let failedQueue: Array<{ resolve: (v: any) => void; reject: (e: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token))
  failedQueue = []
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        isRefreshing = false
        clearAuth()
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken })
        const newAccess = data.data?.access || data.access
        Cookies.set('access_token', newAccess, { expires: 1, secure: true, sameSite: 'strict' })
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`
        processQueue(null, newAccess)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearAuth()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Show error toast for non-401 errors
    const message = (error.response?.data as any)?.message
    if (error.response?.status !== 401 && message) {
      toast.error(message)
    }

    return Promise.reject(error)
  }
)

export const clearAuth = () => {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  if (typeof window !== 'undefined') window.location.href = '/auth/login'
}

export const setAuthTokens = (access: string, refresh: string) => {
  Cookies.set('access_token', access, { expires: 1, secure: true, sameSite: 'strict' })
  Cookies.set('refresh_token', refresh, { expires: 7, secure: true, sameSite: 'strict' })
}

// ── Typed API response helper ─────────────────────────────────────────────────
export interface ApiResponse<T = any> {
  status: 'success' | 'error'
  message: string
  data: T | null
  errors: any | null
  meta: { timestamp: string; version: string; pagination?: any }
}

export const unwrap = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.status === 'error') throw new Error(response.data.message)
  return response.data.data as T
}