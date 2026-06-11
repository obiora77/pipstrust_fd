'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { investmentService } from '@/lib/services'
import { formatCurrency, formatDate, formatDateTime, getStatusColor, getPaymentMethodLabel } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'
import toast from 'react-hot-toast'
import { ArrowDownToLine, Loader2, X, Upload, Copy } from 'lucide-react'

const WALLET_ADDRESSES: Record<string, { address: string; network: string }> = {
  bitcoin:  { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin Network' },
  ethereum: { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'ERC-20' },
  usdt:     { address: 'TN3W4H6rK2ce4vX9YnFQHwKx6Le9XszaUk', network: 'TRC-20' },
}

const METHODS = [
  { value: 'bitcoin', label: 'Bitcoin (BTC)' },
  { value: 'ethereum', label: 'Ethereum (ETH)' },
  { value: 'usdt', label: 'USDT (TRC-20)' },
]

export default function DepositsPage() {
  const qc = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [method, setMethod] = useState('bitcoin')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState('')
  const [proof, setProof] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)

  const { data: deposits, isLoading } = useQuery({
    queryKey: ['deposits'],
    queryFn: () => investmentService.getDeposits().then(r => r.data.data!),
  })

  const createMutation = useMutation({
    mutationFn: (fd: FormData) => investmentService.createDeposit(fd),
    onSuccess: () => {
      toast.success('Deposit submitted! Awaiting admin confirmation.')
      qc.invalidateQueries({ queryKey: ['deposits'] })
      setShowModal(false)
      setAmount(''); setTxHash(''); setProof(null)
    },
  })

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) { toast.error('Enter a valid amount'); return }
    const fd = new FormData()
    fd.append('amount', amount)
    fd.append('payment_method', method)
    if (txHash) fd.append('transaction_hash', txHash)
    if (proof) fd.append('proof_of_payment', proof)
    createMutation.mutate(fd)
  }

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr)
    setCopied(true)
    toast.success('Address copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const walletInfo = WALLET_ADDRESSES[method]

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Deposits</h1>
          <p className="text-dark-400 text-sm mt-1">Fund your account to start investing</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-gold-gradient text-dark-950 font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm flex items-center gap-2">
          <ArrowDownToLine size={16} /> New Deposit
        </button>
      </div>

      {/* Deposits table */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-dark-700">
          <h2 className="font-display font-bold text-white">Deposit History</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-gold-400" /></div>
        ) : !deposits?.length ? (
          <div className="text-center py-16">
            <ArrowDownToLine size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500">No deposits yet. Make your first deposit to start investing.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-dark-400 text-xs border-b border-dark-700">
                  {['Amount', 'Method', 'Tx Hash', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deposits.map(d => (
                  <tr key={d.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gold-400 font-mono">{formatCurrency(d.amount)}</td>
                    <td className="px-6 py-4 text-dark-300">{getPaymentMethodLabel(d.payment_method)}</td>
                    <td className="px-6 py-4 text-dark-400 font-mono text-xs">{d.transaction_hash ? `${d.transaction_hash.slice(0, 16)}...` : '—'}</td>
                    <td className="px-6 py-4"><span className={getStatusColor(d.status)}>{d.status}</span></td>
                    <td className="px-6 py-4 text-dark-400">{formatDate(d.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Deposit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">New Deposit</h2>
              <button onClick={() => setShowModal(false)} className="text-dark-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              {/* Method */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {METHODS.map(m => (
                    <button key={m.value} onClick={() => setMethod(m.value)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                        method === m.value ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-dark-600 text-dark-300 hover:border-dark-500'
                      }`}>{m.label}</button>
                  ))}
                </div>
              </div>

              {/* Wallet address */}
              {walletInfo && (
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-4">
                  <p className="text-xs text-dark-400 mb-1">Send to this address ({walletInfo.network})</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-mono text-gold-400 break-all flex-1">{walletInfo.address}</p>
                    <button onClick={() => copyAddress(walletInfo.address)}
                      className="shrink-0 p-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-400 hover:text-white transition-all">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Amount (USD)</label>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" step="0.01"
                  placeholder="100.00" className="input-gold w-full" />
              </div>

              {/* Tx hash */}
              {(
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">Transaction Hash</label>
                  <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="0x..." className="input-gold w-full font-mono text-sm" />
                </div>
              )}

              {/* Proof */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Proof of Payment (optional)</label>
                <label className="flex items-center gap-3 p-4 border border-dashed border-dark-600 rounded-xl cursor-pointer hover:border-gold-500/40 transition-all">
                  <Upload size={18} className="text-dark-400" />
                  <span className="text-sm text-dark-400">{proof ? proof.name : 'Upload screenshot...'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setProof(e.target.files?.[0] || null)} />
                </label>
              </div>

              <button onClick={handleSubmit} disabled={createMutation.isPending}
                className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {createMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : 'Submit Deposit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}