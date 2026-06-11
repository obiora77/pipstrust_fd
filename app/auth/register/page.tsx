'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react'
import { authService } from '@/lib/services'

const schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  country: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password2: z.string(),
  referral_code: z.string().optional(),
}).refine(d => d.password === d.password2, { message: 'Passwords do not match', path: ['password2'] })

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { referral_code: searchParams.get('ref') || '' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await authService.register(data)
      toast.success('Account created! Check your email for OTP.')
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`)
    } catch (err: any) {
      // errors shown by axios interceptor
    } finally {
      setLoading(false)
    }
  }

  const perks = ['Fixed ROI on every plan', 'Instant withdrawals', 'Referral bonuses', '24/7 support']

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Left */}
      <div className="hidden lg:flex w-5/12 bg-dark-900 border-r border-dark-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        </div>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center">
            <span className="text-dark-950 font-display font-bold">P</span>
          </div>
          <span className="font-display font-bold text-xl text-white">PipsTrust</span>
        </Link>
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-6">Start your investment journey today.</h2>
          <ul className="space-y-4">
            {perks.map(p => (
              <li key={p} className="flex items-center gap-3 text-dark-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-gold-400" />
                </div>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-dark-500 text-xs">By creating an account you agree to our Terms of Service and Privacy Policy.</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <span className="text-dark-950 font-bold text-sm">P</span>
            </div>
            <span className="font-display font-bold text-white">PipsTrust</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Create your account</h1>
            <p className="text-dark-400">Join thousands of investors earning daily returns</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">First Name</label>
                <input {...register('first_name')} placeholder="Anthony" className="input-gold w-full" />
                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Last Name</label>
                <input {...register('last_name')} placeholder="Rice" className="input-gold w-full" />
                {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
              <input {...register('email')} type="email" placeholder="you@example.com" className="input-gold w-full" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Phone (optional)</label>
                <input {...register('phone')} placeholder="+1234567890" className="input-gold w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Country (optional)</label>
                <input {...register('country')} placeholder="Germmey" className="input-gold w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Password</label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters" className="input-gold w-full pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Confirm Password</label>
              <input {...register('password2')} type="password" placeholder="Repeat password" className="input-gold w-full" />
              {errors.password2 && <p className="text-red-400 text-xs mt-1">{errors.password2.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Referral Code (optional)</label>
              <input {...register('referral_code')} placeholder="Enter referral code" className="input-gold w-full" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-dark-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
