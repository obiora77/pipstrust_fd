'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/lib/services'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import toast from 'react-hot-toast'
import {
  Users, Wallet, TrendingUp, ArrowUpDown, Clock, Loader2,
  CheckCircle, XCircle, Shield, BarChart3, Megaphone, DollarSign,
} from 'lucide-react'

type AdminTab = 'overview' | 'deposits' | 'withdrawals' | 'users' | 'plans' | 'broadcast'

export default function AdminPage() {
  const qc = useQueryClient()
  const [tab, setTab] = useState<AdminTab>('overview')

  // Overview stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminService.getStats().then(r => r.data.data),
    enabled: tab === 'overview',
  })

  // Deposits
  const { data: deposits } = useQuery({
    queryKey: ['admin-deposits'],
    queryFn: () => adminService.getDeposits({ status: 'pending' }).then(r => r.data.data),
    enabled: tab === 'deposits',
  })

  // Withdrawals
  const { data: withdrawals } = useQuery({
    queryKey: ['admin-withdrawals'],
    queryFn: () => adminService.getWithdrawals({ status: 'otp_verified' }).then(r => r.data.data),
    enabled: tab === 'withdrawals',
  })

  // Users
  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminService.getUsers().then(r => r.data.data),
    enabled: tab === 'users',
  })

  // Plans
  const { data: plans } = useQuery({
    queryKey: ['admin-plans'],
    queryFn: () => adminService.getPlans().then(r => r.data.data),
    enabled: tab === 'plans',
  })

  const depositMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'approve' | 'reject' }) =>
      adminService.depositAction(id, { action }),
    onSuccess: (_, vars) => {
      toast.success(`Deposit ${vars.action === 'approve' ? 'approved' : 'rejected'}`)
      qc.invalidateQueries({ queryKey: ['admin-deposits'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })

  const withdrawalMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'approve' | 'reject' }) =>
      adminService.withdrawalAction(id, { action }),
    onSuccess: (_, vars) => {
      toast.success(`Withdrawal ${vars.action === 'approve' ? 'approved' : 'rejected'}`)
      qc.invalidateQueries({ queryKey: ['admin-withdrawals'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })

  const toggleUserMutation = useMutation({
    mutationFn: adminService.toggleUserStatus,
    onSuccess: () => { toast.success('User status updated'); qc.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  // Broadcast state
  const [broadcast, setBroadcast] = useState({ subject: '', message: '', target: 'all' })
  const broadcastMutation = useMutation({
    mutationFn: () => adminService.broadcast(broadcast),
    onSuccess: (res) => { toast.success(res.data.message); setBroadcast({ subject: '', message: '', target: 'all' }) },
  })

  const tabs: { key: AdminTab; label: string; icon: any }[] = [
    { key: 'overview',    label: 'Overview',    icon: BarChart3 },
    { key: 'deposits',    label: 'Deposits',    icon: DollarSign },
    { key: 'withdrawals', label: 'Withdrawals', icon: ArrowUpDown },
    { key: 'users',       label: 'Users',       icon: Users },
    { key: 'plans',       label: 'Plans',       icon: TrendingUp },
    { key: 'broadcast',   label: 'Broadcast',   icon: Megaphone },
  ]

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
          <Shield size={20} className="text-gold-400" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Admin Panel</h1>
          <p className="text-dark-400 text-sm">Platform management</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-dark-800 border border-dark-700 p-1 rounded-xl overflow-x-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              tab === key ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-dark-400 hover:text-white'
            }`}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div>
          {statsLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
          ) : stats && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Users',       value: stats.total_users,              icon: Users,       color: 'text-blue-400',    bg: 'bg-blue-500/10' },
                  { label: 'Platform Balance',  value: formatCurrency(stats.total_platform_balance), icon: Wallet, color: 'text-gold-400', bg: 'bg-gold-500/10' },
                  { label: 'Total Deposits',    value: formatCurrency(stats.total_deposits),  icon: DollarSign,  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Total Withdrawals', value: formatCurrency(stats.total_withdrawals), icon: ArrowUpDown, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="stat-card">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-dark-400 text-xs">{label}</p>
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                        <Icon size={15} className={color} />
                      </div>
                    </div>
                    <p className="text-xl font-display font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Pending Deposits',     value: stats.pending_deposits },
                  { label: 'Pending Withdrawals',  value: stats.pending_withdrawals },
                  { label: 'Active Investments',   value: stats.total_active_investments },
                  { label: 'Verified Users',       value: stats.verified_users },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-dark-800 border border-dark-700 rounded-xl p-4">
                    <p className="text-dark-400 text-xs mb-1">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Deposits */}
      {tab === 'deposits' && (
        <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-dark-700">
            <h2 className="font-bold text-white">Pending Deposits</h2>
          </div>
          {!deposits?.length ? (
            <div className="text-center py-12 text-dark-500">No pending deposits</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-dark-400 text-xs border-b border-dark-700">
                  {['User', 'Amount', 'Method', 'Tx Hash', 'Date', 'Actions'].map(h => <th key={h} className="text-left px-5 py-3">{h}</th>)}
                </tr></thead>
                <tbody>
                  {deposits.map((d: any) => (
                    <tr key={d.id} className="border-b border-dark-700/50 hover:bg-dark-700/20">
                      <td className="px-5 py-3 text-white text-xs">{d.user_email}</td>
                      <td className="px-5 py-3 text-gold-400 font-mono">{formatCurrency(d.amount)}</td>
                      <td className="px-5 py-3 text-dark-300 capitalize">{d.payment_method}</td>
                      <td className="px-5 py-3 text-dark-400 font-mono text-xs">{d.transaction_hash ? d.transaction_hash.slice(0, 14) + '...' : '—'}</td>
                      <td className="px-5 py-3 text-dark-400">{formatDate(d.created_at)}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => depositMutation.mutate({ id: d.id, action: 'approve' })}
                            disabled={depositMutation.isPending}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => depositMutation.mutate({ id: d.id, action: 'reject' })}
                            disabled={depositMutation.isPending}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Withdrawals */}
      {tab === 'withdrawals' && (
        <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-dark-700">
            <h2 className="font-bold text-white">Pending Withdrawals (OTP Verified)</h2>
          </div>
          {!withdrawals?.length ? (
            <div className="text-center py-12 text-dark-500">No withdrawals awaiting action</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-dark-400 text-xs border-b border-dark-700">
                  {['User', 'Amount', 'Method', 'Destination', 'Date', 'Actions'].map(h => <th key={h} className="text-left px-5 py-3">{h}</th>)}
                </tr></thead>
                <tbody>
                  {withdrawals.map((w: any) => (
                    <tr key={w.id} className="border-b border-dark-700/50 hover:bg-dark-700/20">
                      <td className="px-5 py-3 text-white text-xs">{w.user_email}</td>
                      <td className="px-5 py-3 text-gold-400 font-mono">{formatCurrency(w.amount)}</td>
                      <td className="px-5 py-3 text-dark-300 capitalize">{w.method}</td>
                      <td className="px-5 py-3 text-dark-400 font-mono text-xs">{(w.payout_address || w.bank_account_number || '—').slice(0, 16)}</td>
                      <td className="px-5 py-3 text-dark-400">{formatDate(w.created_at)}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => withdrawalMutation.mutate({ id: w.id, action: 'approve' })}
                            disabled={withdrawalMutation.isPending}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => withdrawalMutation.mutate({ id: w.id, action: 'reject' })}
                            disabled={withdrawalMutation.isPending}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-dark-700"><h2 className="font-bold text-white">All Users</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-dark-400 text-xs border-b border-dark-700">
                {['Name', 'Email', 'Balance', 'Verified', 'Status', 'Joined', 'Actions'].map(h => <th key={h} className="text-left px-5 py-3">{h}</th>)}
              </tr></thead>
              <tbody>
                {users?.map((u: any) => (
                  <tr key={u.id} className="border-b border-dark-700/50 hover:bg-dark-700/20">
                    <td className="px-5 py-3 text-white font-medium">{u.first_name} {u.last_name}</td>
                    <td className="px-5 py-3 text-dark-300 text-xs">{u.email}</td>
                    <td className="px-5 py-3 text-gold-400 font-mono">{formatCurrency(u.wallet_balance)}</td>
                    <td className="px-5 py-3">{u.is_verified ? <span className="badge-success">Yes</span> : <span className="badge-error">No</span>}</td>
                    <td className="px-5 py-3">{u.is_active ? <span className="badge-success">Active</span> : <span className="badge-error">Banned</span>}</td>
                    <td className="px-5 py-3 text-dark-400">{formatDate(u.created_at)}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleUserMutation.mutate(u.id)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                          u.is_active ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}>{u.is_active ? 'Ban' : 'Unban'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Plans */}
      {tab === 'plans' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans?.map((plan: any) => (
            <div key={plan.id} className="bg-dark-800 border border-dark-700 rounded-2xl p-5 card-glow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-white">{plan.name}</h3>
                <span className={plan.is_active ? 'badge-success' : 'badge-error'}>{plan.is_active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="text-3xl font-display font-bold text-gold-400">{plan.roi_percentage}%</div>
              <p className="text-dark-400 text-xs mt-0.5">{plan.duration} {plan.duration_unit}</p>
              <div className="mt-4 pt-4 border-t border-dark-700 text-sm space-y-1">
                <div className="flex justify-between"><span className="text-dark-400">Min</span><span className="text-white">{formatCurrency(plan.min_amount)}</span></div>
                {plan.max_amount && <div className="flex justify-between"><span className="text-dark-400">Max</span><span className="text-white">{formatCurrency(plan.max_amount)}</span></div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Broadcast */}
      {tab === 'broadcast' && (
        <div className="max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-5">
          <div>
            <h2 className="font-display font-bold text-white mb-1">Broadcast Email</h2>
            <p className="text-dark-400 text-sm">Send a message to all or targeted users</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Target Audience</label>
            <select value={broadcast.target} onChange={e => setBroadcast(b => ({ ...b, target: e.target.value }))} className="input-gold w-full">
              <option value="all">All Users</option>
              <option value="verified">Verified Users Only</option>
              <option value="active_investors">Active Investors Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Subject</label>
            <input value={broadcast.subject} onChange={e => setBroadcast(b => ({ ...b, subject: e.target.value }))}
              placeholder="Email subject..." className="input-gold w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Message</label>
            <textarea value={broadcast.message} onChange={e => setBroadcast(b => ({ ...b, message: e.target.value }))}
              rows={6} placeholder="Write your message..." className="input-gold w-full resize-none" />
          </div>

          <button onClick={() => broadcastMutation.mutate()} disabled={broadcastMutation.isPending || !broadcast.subject || !broadcast.message}
            className="bg-gold-gradient text-dark-950 font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50">
            {broadcastMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <><Megaphone size={16} /> Send Broadcast</>}
          </button>
        </div>
      )}
    </DashboardLayout>
  )
}
