'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, TrendingUp, ArrowUpDown, Wallet,
  Bell, User, Settings, LogOut, Menu, X, ChevronRight,
  Shield, BarChart3, ArrowDownToLine,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/lib/services'
import Cookies from 'js-cookie'

const userNav = [
  { label: 'Dashboard',    href: '/dashboard',     icon: LayoutDashboard },
  { label: 'Investments',  href: '/investments',   icon: TrendingUp },
  { label: 'Deposits',     href: '/deposits',      icon: ArrowDownToLine },
  { label: 'Withdrawals',  href: '/withdrawals',   icon: ArrowUpDown },
  { label: 'Transactions', href: '/transactions',  icon: BarChart3 },
  { label: 'Notifications',href: '/notifications', icon: Bell },
  { label: 'Profile',      href: '/profile',       icon: User },
]

const adminNav = [
  { label: 'Admin Panel',  href: '/admin',         icon: Shield },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const refresh = Cookies.get('refresh_token')
      if (refresh) await authService.logout(refresh)
    } catch {}
    logout()
    toast.success('Logged out successfully')
  }

  const nav = user?.is_staff ? [...userNav, ...adminNav] : userNav

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-700 flex flex-col',
        'transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-dark-700">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <span className="text-dark-950 font-display font-bold text-sm">P</span>
            </div>
            <span className="font-display font-bold text-white text-lg">PipsTrust</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-dark-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-dark-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-800">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-dark-950 font-bold text-sm">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn('sidebar-item', pathname === href && 'active')}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
              {pathname === href && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-dark-700">
          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-dark-400 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-sm text-dark-400 font-medium capitalize">
              {pathname.split('/').filter(Boolean).join(' / ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-gold-400 transition-colors">
              <Bell size={18} />
            </Link>
            <Link href="/profile" className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-dark-950 font-bold text-xs">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
