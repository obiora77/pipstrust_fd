import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-dark-950 px-6 py-24 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_40%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary">Terms of Service</p>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">Welcome to PipsTrust</h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
              These terms govern your access and use of the PipsTrust platform, services, and features.
              Please review them carefully before creating an account or investing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid gap-10">
            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Acceptance of Terms</h2>
              <p className="text-slate-300 leading-7">
                By using PipsTrust, you agree to these Terms of Service, our Privacy Policy, and all applicable laws.
                If you do not agree, please do not use the platform.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Account Responsibilities</h2>
              <p className="text-slate-300 leading-7">
                You are responsible for keeping your login credentials secure and for all activity on your account.
                Notify us immediately if you suspect unauthorized access.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Using the Service</h2>
              <p className="text-slate-300 leading-7">
                Use PipsTrust lawfully and only for permitted investment purposes. Do not misuse the platform, and follow all applicable regulations.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Fees and Payments</h2>
              <p className="text-slate-300 leading-7">
                All fees, charges, and payment terms are outlined at checkout or in your account agreement.
                You agree to pay any applicable fees associated with your chosen services.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Intellectual Property</h2>
              <p className="text-slate-300 leading-7">
                PipsTrust owns the platform content, trademarks, and software. You may not copy or resell our proprietary materials without permission.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Limitation of Liability</h2>
              <p className="text-slate-300 leading-7">
                PipsTrust is not responsible for investment losses, market fluctuations, or unauthorized transactions beyond our control.
                Use the platform at your own risk and review the full terms carefully.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
