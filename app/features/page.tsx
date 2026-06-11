import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Features from '@/components/home/Features'
import Floating from '@/components/home/Floating'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-slate-950/80 px-6 py-20 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_45%)]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary">Platform Features</p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Powerful tools built to help investors win.
              </h1>
              <p className="mb-8 text-lg leading-8 text-slate-300">
                From secure account protection to instant withdrawals and predictable returns, PipsTrust
                gives you the confidence to invest smarter and move faster.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/90 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Features />

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Secure & Compliant</h2>
              <p className="mt-4 text-slate-300">
                Every account is shielded with enterprise-grade encryption, strict access controls,
                and audit-ready systems.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Fast Execution</h2>
              <p className="mt-4 text-slate-300">
                Execute investments and withdrawals without delay, supported by a responsive
                infrastructure and global payment rails.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Transparent Returns</h2>
              <p className="mt-4 text-slate-300">
                Know exactly what you earn before you invest with clear, guaranteed plan rates.
              </p>
            </div>
          </div>
        </section>

        <Floating />
      </main>

      <Footer />
    </div>
  )
}
