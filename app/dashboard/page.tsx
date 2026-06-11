'use client'
import { useQuery } from '@tanstack/react-query'
import { investmentService } from '@/lib/services'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/store'
import { Wallet, TrendingUp, ArrowUpDown, Users, ArrowDownToLine, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuthStore()

  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => investmentService.getDashboard().then(r => r.data.data!),
  })

  const { data: investments } = useQuery({
    queryKey: ['investments', 'active'],
    queryFn: () => investmentService.getInvestments({ status: 'active' }).then(r => r.data.data!),
  })

  const { data: transactions } = useQuery({
    queryKey: ['transactions-recent'],
    queryFn: () => investmentService.getTransactions().then(r => r.data.data!),
  })

  const stats = summary ? [
    { label: 'Wallet Balance',    value: formatCurrency(summary.wallet_balance),   icon: Wallet,         color: 'text-gold-400',    bg: 'bg-gold-500/10' },
    { label: 'Total Deposited',   value: formatCurrency(summary.total_deposited),  icon: ArrowDownToLine, color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'Total Earned',      value: formatCurrency(summary.total_earned),     icon: TrendingUp,     color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Total Withdrawn',   value: formatCurrency(summary.total_withdrawn),  icon: ArrowUpDown,    color: 'text-purple-400',  bg: 'bg-purple-500/10' },
  ] : []

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">
          Good day, {user?.first_name}
        </h1>
        <p className="text-dark-400 text-sm mt-1">Here's your investment overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat-card animate-pulse">
              <div className="h-4 bg-dark-700 rounded w-24 mb-3" />
              <div className="h-7 bg-dark-700 rounded w-32" />
            </div>
          ))
        ) : stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-dark-400 text-sm">{label}</p>
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {summary && [
          { label: 'Active Investments', value: summary.active_investments, icon: TrendingUp, href: '/investments' },
          { label: 'Pending Deposits',   value: summary.pending_deposits,   icon: Clock,       href: '/deposits' },
          { label: 'Referrals',          value: summary.referral_count,     icon: Users,       href: '/profile' },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-gold-500/30 transition-all group">
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-dark-400 group-hover:text-gold-400 transition-colors" />
              <div>
                <p className="text-xs text-dark-400">{label}</p>
                <p className="text-xl font-bold text-white">{value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active investments */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-white">Active Investments</h2>
            <Link href="/investments" className="text-gold-400 text-xs hover:text-gold-300 transition-colors">View all</Link>
          </div>

          {!investments?.length ? (
            <div className="text-center py-10">
              <TrendingUp size={36} className="text-dark-600 mx-auto mb-3" />
              <p className="text-dark-500 text-sm">No active investments</p>
              <Link href="/investments" className="text-gold-400 text-sm mt-2 inline-block hover:text-gold-300 transition-colors">
                Browse plans →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {investments.slice(0, 4).map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-3 bg-dark-900 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-white">{inv.plan.name} Plan</p>
                    <p className="text-xs text-dark-400 mt-0.5">Ends {formatDate(inv.ends_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gold-400">{formatCurrency(inv.amount)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 w-20 bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gold-gradient rounded-full transition-all" style={{ width: `${inv.progress_percentage}%` }} />
                      </div>
                      <span className="text-xs text-dark-500">{inv.progress_percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent transactions */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-white">Recent Transactions</h2>
            <Link href="/transactions" className="text-gold-400 text-xs hover:text-gold-300 transition-colors">View all</Link>
          </div>

          {!transactions?.length ? (
            <div className="text-center py-10">
              <ArrowUpDown size={36} className="text-dark-600 mx-auto mb-3" />
              <p className="text-dark-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 6).map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                      tx.type === 'deposit' ? 'bg-blue-500/10 text-blue-400' :
                      tx.type === 'withdrawal' ? 'bg-purple-500/10 text-purple-400' :
                      tx.type === 'roi' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-gold-500/10 text-gold-400'
                    }`}>
                      {tx.type === 'deposit' ? '↓' : tx.type === 'withdrawal' ? '↑' : tx.type === 'roi' ? '✓' : '★'}
                    </div>
                    <div>
                      <p className="text-sm text-white capitalize">{tx.type.replace('_', ' ')}</p>
                      <p className="text-xs text-dark-500">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${tx.type === 'withdrawal' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {tx.type === 'withdrawal' ? '-' : '+'}{formatCurrency(tx.amount)}
                    </p>
                    <span className={getStatusColor(tx.status)}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
