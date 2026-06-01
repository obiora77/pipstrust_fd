'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { authService } from '@/lib/services'

const schema = z.object({
  new_password: z.string().min(8, 'Password must be at least 8 characters'),
  new_password2: z.string(),
}).refine(d => d.new_password === d.new_password2, { message: 'Passwords do not match', path: ['new_password2'] })
type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next)
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  const onSubmit = async (data: FormData) => {
    const code = otp.join('')
    if (code.length < 6) { toast.error('Enter the 6-digit OTP'); return }
    setLoading(true)
    try {
      await authService.confirmPasswordReset({ email, code, ...data })
      toast.success('Password reset successfully!')
      router.push('/auth/login')
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/auth/forgot-password" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-2">Reset Password</h1>
          <p className="text-dark-400 text-sm mb-8">Enter the OTP sent to <span className="text-gold-400">{email}</span> and your new password.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-3">Verification Code</label>
              <div className="flex gap-2">
                {otp.map((d, i) => (
                  <input key={i} ref={el => { inputs.current[i] = el }} type="text" inputMode="numeric"
                    maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => e.key === 'Backspace' && !otp[i] && i > 0 && inputs.current[i-1]?.focus()}
                    className={`w-11 h-12 text-center text-lg font-bold rounded-lg border bg-dark-800 text-white outline-none transition-all
                      ${d ? 'border-gold-500' : 'border-dark-600 focus:border-gold-500'}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">New Password</label>
              <div className="relative">
                <input {...register('new_password')} type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" className="input-gold w-full pr-11" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.new_password && <p className="text-red-400 text-xs mt-1">{errors.new_password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Confirm New Password</label>
              <input {...register('new_password2')} type="password" placeholder="Repeat password" className="input-gold w-full" />
              {errors.new_password2 && <p className="text-red-400 text-xs mt-1">{errors.new_password2.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
