'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Loader2, ArrowLeft, KeyRound } from 'lucide-react'
import { authService } from '@/lib/services'

const schema = z.object({ email: z.string().email('Enter a valid email') })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async ({ email }: FormData) => {
    setLoading(true)
    try {
      await authService.requestPasswordReset(email)
      toast.success('Reset OTP sent if account exists.')
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6">
            <KeyRound size={24} className="text-gold-400" />
          </div>

          <h1 className="text-2xl font-display font-bold text-white mb-2">Forgot your password?</h1>
          <p className="text-dark-400 text-sm mb-8">No worries. Enter your email and we'll send you a reset code.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
              <input {...register('email')} type="email" placeholder="you@example.com" className="input-gold w-full" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
