'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { authService } from '@/lib/services'
import { useAuthStore } from '@/lib/store'
import { setAuthTokens } from '@/lib/api'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await authService.login(data)
      const { user, access, refresh } = res.data.data!
      setAuthTokens(access, refresh)
      setUser(user)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (err: any) {
      const errData = err?.response?.data
      if (errData?.errors?.requires_verification) {
        toast.error('Please verify your email first.')
        router.push(`/auth/verify-email?email=${encodeURIComponent(errData.errors.email)}`)
      } else if (errData?.message) {
        toast.error(errData.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-dark-900 border-r border-dark-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        </div>
        <Link href="/" className="flex items-center gap-2 relative">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center">
            <span className="text-dark-950 font-display font-bold">P</span>
          </div>
          <span className="font-display font-bold text-xl text-white">PipsTrust</span>
        </Link>
        <div className="relative">
          <blockquote className="text-2xl font-display font-bold text-white leading-snug mb-4">
            "The best investment you can make is in yourself and your financial future."
          </blockquote>
          <p className="text-dark-400 text-sm">— PipsTrust Investment Philosophy</p>
        </div>
        <div className="grid grid-cols-2 gap-4 relative">
          {[['$8.2M+', 'Total Payouts'], ['12K+', 'Active Investors'], ['99.9%', 'Uptime'], ['40+', 'Countries']].map(([val, label]) => (
            <div key={label} className="bg-dark-800 rounded-xl p-4 border border-dark-700">
              <p className="text-gold-400 font-display font-bold text-xl">{val}</p>
              <p className="text-dark-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <span className="text-dark-950 font-bold text-sm">P</span>
            </div>
            <span className="font-display font-bold text-white">PipsTrust</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome back</h1>
            <p className="text-dark-400">Sign in to your investment account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Email address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="input-gold w-full"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-dark-200">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-gold-400 hover:text-gold-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-gold w-full pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient text-dark-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-dark-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
