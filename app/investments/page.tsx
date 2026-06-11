'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { investmentService } from '@/lib/services'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import toast from 'react-hot-toast'
import { TrendingUp, Loader2, X, Wallet } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function InvestmentsPage() {
  const qc = useQueryClient()
  const { user } = useAuthStore()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [showModal, setShowModal] = useState(false)

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => investmentService.getPlans().then(r => r.data.data!),
  })

  const { data: investments, isLoading } = useQuery({
    queryKey: ['investments'],
    queryFn: () => investmentService.getInvestments().then(r => r.data.data!),
  })

  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => investmentService.getDashboard().then(r => r.data.data!),
  })

  const createMutation = useMutation({
    mutationFn: investmentService.createInvestment,
    onSuccess: () => {
      toast.success('Investment started successfully!')
      qc.invalidateQueries({ queryKey: ['investments'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      closeModal()
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.errors?.amount || err?.response?.data?.message || 'Failed to start investment'
      toast.error(msg)
    },
  })

  const openModal = (planId?: string) => {
    if (planId) setSelectedPlan(planId)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPlan(null)
    setAmount('')
  }

  const activePlan = plans?.find(p => p.id === selectedPlan)
  const walletBalance = Number(dashboard?.wallet_balance ?? 0)

  const handleSubmit = () => {
    if (!selectedPlan) { toast.error('Please select a plan'); return }
    if (!amount || Number(amount) <= 0) { toast.error('Enter a valid amount'); return }
    createMutation.mutate({ plan_id: selectedPlan, amount })
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Investments</h1>
          <p className="text-dark-400 text-sm mt-1">Invest from your wallet balance</p>
        </div>
        <button onClick={() => openModal()}
          className="bg-gold-gradient text-dark-950 font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm flex items-center gap-2">
          <TrendingUp size={16} /> New Investment
        </button>
      </div>

      {/* Wallet balance bar */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
            <Wallet size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="text-xs text-dark-400">Available Wallet Balance</p>
            <p className="text-xl font-display font-bold text-gold-400">{formatCurrency(walletBalance)}</p>
          </div>
        </div>
        <a href="/deposits" className="text-xs text-gold-400 hover:text-gold-300 border border-gold-500/30 px-3 py-1.5 rounded-lg transition-colors">
          + Add Funds
        </a>
      </div>

      {/* Plans - clickable cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {plans?.map(plan => (
          <button
            key={plan.id}
            onClick={() => openModal(plan.id)}
            className={`text-left bg-dark-800 rounded-2xl p-5 card-glow transition-all hover:scale-[1.02] hover:border-gold-500/60 cursor-pointer ${
              plan.is_featured ? 'border border-gold-500/40' : 'border border-dark-700'
            }`}
          >
            {plan.is_featured && (
              <span className="inline-block bg-gold-gradient text-dark-950 text-xs font-bold px-3 py-0.5 rounded-full mb-3">POPULAR</span>
            )}
            <h3 className="font-display font-bold text-white text-lg">{plan.name}</h3>
            <div className="text-3xl font-display font-bold text-gold-400 mt-2">{plan.roi_percentage}%</div>
            <p className="text-dark-400 text-xs mt-0.5">ROI over {plan.duration} {plan.duration_unit}</p>
            <div className="mt-4 pt-4 border-t border-dark-700 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-dark-400">Min</span><span className="text-white">{formatCurrency(plan.min_amount)}</span></div>
              {plan.max_amount && <div className="flex justify-between"><span className="text-dark-400">Max</span><span className="text-white">{formatCurrency(plan.max_amount)}</span></div>}
            </div>
            <div className="mt-4 w-full bg-gold-gradient text-dark-950 text-xs font-bold py-2 rounded-xl text-center">
              Invest Now
            </div>
          </button>
        ))}
      </div>

      {/* Investments table */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-dark-700">
          <h2 className="font-display font-bold text-white">Your Investments</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
        ) : !investments?.length ? (
          <div className="text-center py-16">
            <TrendingUp size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500">No investments yet. Click any plan above to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-dark-400 text-xs border-b border-dark-700">
                  {['Plan', 'Amount', 'Expected Return', 'ROI', 'Progress', 'End Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {investments.map(inv => (
                  <tr key={inv.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{inv.plan.name}</td>
                    <td className="px-6 py-4 text-gold-400 font-mono">{formatCurrency(inv.amount)}</td>
                    <td className="px-6 py-4 text-emerald-400 font-mono">{formatCurrency(inv.expected_return)}</td>
                    <td className="px-6 py-4 text-white">{inv.roi_percentage}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-dark-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${inv.progress_percentage}%` }} />
                        </div>
                        <span className="text-xs text-dark-400">{inv.progress_percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-300">{formatDate(inv.ends_at)}</td>
                    <td className="px-6 py-4"><span className={getStatusColor(inv.status)}>{inv.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Investment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">Start Investment</h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            {/* Wallet balance */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 mb-5 flex items-center justify-between">
              <span className="text-sm text-dark-400">Your Balance</span>
              <span className="text-gold-400 font-bold font-mono">{formatCurrency(walletBalance)}</span>
            </div>

            <div className="space-y-4">
              {/* Plan selector */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Select Plan</label>
                <select value={selectedPlan || ''} onChange={e => { setSelectedPlan(e.target.value); setAmount('') }}
                  className="input-gold w-full">
                  <option value="">Choose a plan...</option>
                  {plans?.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.roi_percentage}% / {p.duration} {p.duration_unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan details */}
              {activePlan && (
                <div className="bg-dark-800 border border-gold-500/20 rounded-xl p-4 text-sm space-y-1.5">
                  <div className="flex justify-between"><span className="text-dark-400">ROI</span><span className="text-gold-400 font-bold">{activePlan.roi_percentage}%</span></div>
                  <div className="flex justify-between"><span className="text-dark-400">Duration</span><span className="text-white">{activePlan.duration} {activePlan.duration_unit}</span></div>
                  <div className="flex justify-between"><span className="text-dark-400">Min Amount</span><span className="text-white">{formatCurrency(activePlan.min_amount)}</span></div>
                  <div className="flex justify-between"><span className="text-dark-400">Max Amount</span><span className="text-white">{activePlan.max_amount ? formatCurrency(activePlan.max_amount) : 'Unlimited'}</span></div>
                  {amount && Number(amount) > 0 && (
                    <div className="flex justify-between pt-2 border-t border-dark-700">
                      <span className="text-dark-400">Expected Return</span>
                      <span className="text-emerald-400 font-bold">
                        {formatCurrency(Number(amount) * (Number(activePlan.roi_percentage) / 100) + Number(amount))}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Amount (USD)</label>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" step="0.01"
                  placeholder={activePlan ? `Min ${formatCurrency(activePlan.min_amount)}` : '0.00'}
                  className="input-gold w-full" />
                {activePlan && amount && Number(amount) > walletBalance && (
                  <p className="text-red-400 text-xs mt-1">Insufficient balance. <a href="/deposits" className="underline">Add funds →</a></p>
                )}
              </div>

              <button onClick={handleSubmit}
                disabled={!selectedPlan || !amount || Number(amount) <= 0 || Number(amount) > walletBalance || createMutation.isPending}
                className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                {createMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Start Investment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}