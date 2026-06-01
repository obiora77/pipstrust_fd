'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2, Mail, ArrowLeft, RefreshCw } from 'lucide-react'
import { authService } from '@/lib/services'
import { useAuthStore } from '@/lib/store'
import { setAuthTokens } from '@/lib/api'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const { setUser } = useAuthStore()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) inputs.current[i + 1]?.focus()
    if (next.every(d => d) && next.join('').length === 6) {
      handleVerify(next.join(''))
    }
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 6) {
      setOtp(paste.split(''))
      inputs.current[5]?.focus()
      handleVerify(paste)
    }
  }

  const handleVerify = async (code: string) => {
    if (loading) return
    setLoading(true)
    try {
      const res = await authService.verifyEmail({ email, code })
      const { user, access, refresh } = res.data.data!
      setAuthTokens(access, refresh)
      setUser(user)
      toast.success('Email verified! Welcome to PipsTrust.')
      router.push('/dashboard')
    } catch (err: any) {
      setOtp(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await authService.resendOTP({ email, purpose: 'email_verification' })
      toast.success('New OTP sent to your email.')
      setCountdown(60)
      setOtp(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } catch {}
    finally { setResending(false) }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-gold-400" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2">Check your email</h1>
            <p className="text-dark-400 text-sm leading-relaxed">
              We sent a 6-digit verification code to<br />
              <span className="text-gold-400 font-medium">{email}</span>
            </p>
          </div>

          {/* OTP inputs */}
          <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border transition-all duration-200 bg-dark-800 text-white outline-none
                  ${digit ? 'border-gold-500 ring-1 ring-gold-500/30' : 'border-dark-600 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30'}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleVerify(otp.join(''))}
            disabled={loading || otp.join('').length < 6}
            className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Email'}
          </button>

          <div className="text-center mt-6">
            {countdown > 0 ? (
              <p className="text-dark-500 text-sm">Resend code in <span className="text-gold-400 font-mono">{countdown}s</span></p>
            ) : (
              <button onClick={handleResend} disabled={resending}
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors disabled:opacity-50">
                {resending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Resend OTP
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-dark-500 text-xs mt-6">
          Wrong email?{' '}
          <Link href="/auth/register" className="text-gold-400 hover:text-gold-300 transition-colors">Go back</Link>
        </p>
      </div>
    </div>
  )
}
