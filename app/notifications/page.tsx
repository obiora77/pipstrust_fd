'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/lib/services'
import { timeAgo } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Bell, Loader2, CheckCheck, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

const TYPE_META: Record<string, { icon: any; color: string; bg: string }> = {
  info:    { icon: Info,          color: 'text-blue-400',    bg: 'bg-blue-500/10' },
  success: { icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  warning: { icon: AlertTriangle, color: 'text-gold-400',    bg: 'bg-gold-500/10' },
  error:   { icon: XCircle,       color: 'text-red-400',     bg: 'bg-red-500/10' },
}

export default function NotificationsPage() {
  const qc = useQueryClient()

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications().then(r => r.data.data!),
  })

  const markAllMutation = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const markOneMutation = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const unread = notifications?.filter(n => !n.is_read).length || 0

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Notifications</h1>
          <p className="text-dark-400 text-sm mt-1">{unread > 0 ? `${unread} unread` : 'All caught up'}</p>
        </div>
        {unread > 0 && (
          <button onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isPending}
            className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors">
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
        ) : !notifications?.length ? (
          <div className="text-center py-16">
            <Bell size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500">No notifications yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700/50">
            {notifications.map(n => {
              const meta = TYPE_META[n.type] || TYPE_META.info
              const Icon = meta.icon
              return (
                <div key={n.id}
                  onClick={() => !n.is_read && markOneMutation.mutate(n.id)}
                  className={`flex gap-4 px-6 py-5 transition-colors cursor-pointer ${n.is_read ? 'opacity-60' : 'hover:bg-dark-700/30'}`}>
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={18} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <p className={`text-sm font-semibold ${n.is_read ? 'text-dark-300' : 'text-white'}`}>{n.title}</p>
                      <span className="text-xs text-dark-500 shrink-0">{timeAgo(n.created_at)}</span>
                    </div>
                    <p className="text-sm text-dark-400 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                  {!n.is_read && <div className="w-2 h-2 rounded-full bg-gold-400 shrink-0 mt-2" />}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
