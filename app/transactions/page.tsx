'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { investmentService } from '@/lib/services'
import { formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { BarChart3, Loader2, ArrowDownLeft, ArrowUpRight, Star, Gift } from 'lucide-react'

const TYPE_ICONS: Record<string, any> = {
  deposit:        { icon: ArrowDownLeft, color: 'text-blue-400',    bg: 'bg-blue-500/10' },
  withdrawal:     { icon: ArrowUpRight,  color: 'text-purple-400',  bg: 'bg-purple-500/10' },
  roi:            { icon: Star,          color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  referral_bonus: { icon: Gift,          color: 'text-gold-400',    bg: 'bg-gold-500/10' },
}

const FILTERS = ['all', 'deposit', 'withdrawal', 'roi', 'referral_bonus']

export default function TransactionsPage() {
  const [filter, setFilter] = useState('all')

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', filter],
    queryFn: () => investmentService.getTransactions(filter !== 'all' ? { type: filter } : {}).then(r => r.data.data!),
  })

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Transactions</h1>
        <p className="text-dark-400 text-sm mt-1">Your complete transaction history</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === f ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30' : 'bg-dark-800 text-dark-400 border border-dark-700 hover:border-dark-600'
            }`}>{f.replace('_', ' ')}</button>
        ))}
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
        ) : !transactions?.length ? (
          <div className="text-center py-16">
            <BarChart3 size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500">No transactions found.</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700/50">
            {transactions.map(tx => {
              const meta = TYPE_ICONS[tx.type] || TYPE_ICONS.deposit
              const Icon = meta.icon
              return (
                <div key={tx.id} className="flex items-center gap-4 px-6 py-4 hover:bg-dark-700/30 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-xs text-dark-400 truncate mt-0.5">{tx.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold font-mono ${tx.type === 'withdrawal' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {tx.type === 'withdrawal' ? '−' : '+'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-dark-500 mt-0.5">{formatDateTime(tx.created_at)}</p>
                  </div>
                  <span className={`${getStatusColor(tx.status)} shrink-0`}>{tx.status}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
