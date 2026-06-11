'use client'
import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { withdrawalService, investmentService } from '@/lib/services'
import { formatCurrency, formatDate, getStatusColor, getPaymentMethodLabel } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { ArrowUpDown, Loader2, X, ShieldCheck } from 'lucide-react'

const METHODS = [
  { value: 'bitcoin', label: 'Bitcoin (BTC)' },
  { value: 'ethereum', label: 'Ethereum (ETH)' },
  { value: 'usdt', label: 'USDT (TRC-20)' },
  { value: 'usdt2', label: 'USDT (ETH-20)'}
]

export default function WithdrawalsPage() {
  const qc = useQueryClient()
  const { user } = useAuthStore()
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [withdrawalId, setWithdrawalId] = useState('')
  const [method, setMethod] = useState('bitcoin')
  const [amount, setAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: () => withdrawalService.getWithdrawals().then(r => r.data.data!),
  })

  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => investmentService.getDashboard().then(r => r.data.data!),
  })

  const requestMutation = useMutation({
    mutationFn: withdrawalService.requestWithdrawal,
    onSuccess: (res) => {
      setWithdrawalId(res.data.data!.withdrawal_id)
      setStep('otp')
      toast.success('OTP sent to your email.')
    },
  })

  const verifyMutation = useMutation({
    mutationFn: withdrawalService.verifyOTP,
    onSuccess: () => {
      toast.success('Withdrawal confirmed! Processing soon.')
      qc.invalidateQueries({ queryKey: ['withdrawals'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      setShowModal(false)
      setStep('form')
      setAmount(''); setOtp(['', '', '', '', '', ''])
    },
  })

  const cancelMutation = useMutation({
    mutationFn: withdrawalService.cancelWithdrawal,
    onSuccess: () => {
      toast.success('Withdrawal cancelled.')
      qc.invalidateQueries({ queryKey: ['withdrawals'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }

  const balance = parseFloat(dashboard?.wallet_balance || '0')

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Withdrawals</h1>
          <p className="text-dark-400 text-sm mt-1">
            Available balance: <span className="text-gold-400 font-semibold">{formatCurrency(balance)}</span>
          </p>
        </div>
        <button onClick={() => { setShowModal(true); setStep('form') }}
          className="bg-gold-gradient text-dark-950 font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm flex items-center gap-2">
          <ArrowUpDown size={16} /> Withdraw Funds
        </button>
      </div>

      {/* Table */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-dark-700">
          <h2 className="font-display font-bold text-white">Withdrawal History</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
        ) : !withdrawals?.length ? (
          <div className="text-center py-16">
            <ArrowUpDown size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500">No withdrawals yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-dark-400 text-xs border-b border-dark-700">
                  {['Amount', 'Method', 'Destination', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gold-400 font-mono">{formatCurrency(w.amount)}</td>
                    <td className="px-6 py-4 text-dark-300">{getPaymentMethodLabel(w.method)}</td>
                    <td className="px-6 py-4 text-dark-400 font-mono text-xs">
                      {w.payout_address ? `${w.payout_address.slice(0, 12)}...` : w.bank_account_number || '—'}
                    </td>
                    <td className="px-6 py-4"><span className={getStatusColor(w.status)}>{w.status.replace('_', ' ')}</span></td>
                    <td className="px-6 py-4 text-dark-400">{formatDate(w.created_at)}</td>
                    <td className="px-6 py-4">
                      {w.status === 'pending' && (
                        <button onClick={() => cancelMutation.mutate(w.id)}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">
                {step === 'form' ? 'Withdraw Funds' : 'Confirm Withdrawal'}
              </h2>
              <button onClick={() => { setShowModal(false); setStep('form') }} className="text-dark-400 hover:text-white"><X size={20} /></button>
            </div>

            {step === 'form' ? (
              <div className="space-y-4">
                <div className="bg-dark-800 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-dark-400 text-sm">Available</span>
                  <span className="text-gold-400 font-bold font-mono">{formatCurrency(balance)}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">Withdrawal Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {METHODS.map(m => (
                      <button key={m.value} onClick={() => setMethod(m.value)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                          method === m.value ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-dark-600 text-dark-300 hover:border-dark-500'
                        }`}>{m.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">Amount (USD)</label>
                  <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0"
                    placeholder="0.00" className="input-gold w-full" />
                  <p className="text-xs text-dark-500 mt-1">Make sure your payout address is set in your profile.</p>
                </div>

                <button onClick={() => requestMutation.mutate({ amount, method })} disabled={requestMutation.isPending || !amount}
                  className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {requestMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Request Withdrawal'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={26} className="text-gold-400" />
                  </div>
                  <p className="text-dark-400 text-sm">Enter the 6-digit OTP sent to your email to confirm this withdrawal.</p>
                </div>

                <div className="flex gap-2 justify-center">
                  {otp.map((d, i) => (
                    <input key={i} ref={el => { otpRefs.current[i] = el }} type="text" inputMode="numeric"
                      maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => e.key === 'Backspace' && !otp[i] && i > 0 && otpRefs.current[i-1]?.focus()}
                      className={`w-11 h-12 text-center text-lg font-bold rounded-xl border bg-dark-800 text-white outline-none transition-all
                        ${d ? 'border-gold-500' : 'border-dark-600 focus:border-gold-500'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => verifyMutation.mutate({ withdrawal_id: withdrawalId, code: otp.join('') })}
                  disabled={verifyMutation.isPending || otp.join('').length < 6}
                  className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {verifyMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Withdrawal'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}