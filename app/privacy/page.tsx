import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-dark-950 px-6 py-24 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_40%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary">Privacy Policy</p>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">Your privacy matters at PipsTrust</h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
              We collect and protect your information with the highest standards of security, transparency, and control. This policy describes what we collect, why we use it, and how you can manage your data.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid gap-10">
            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Information We Collect</h2>
              <p className="text-slate-300 leading-7">
                We collect the information you provide when you create an account, fund your wallet, or contact support.
                This includes identity information, contact details, payment data, and transaction history.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">How We Use Your Data</h2>
              <p className="text-slate-300 leading-7">
                Your data helps us deliver secure investment services, process transactions, prevent fraud, and personalize your experience.
                We also use it to comply with legal obligations and communicate important updates about your account.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Data Security</h2>
              <p className="text-slate-300 leading-7">
                We protect personal data using encryption, access controls, and monitoring systems.
                Only authorized personnel can access your information, and we continuously maintain security safeguards.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Sharing & Third Parties</h2>
              <p className="text-slate-300 leading-7">
                We do not sell your personal data. We may share information with trusted service providers, payment processors, and regulators where required by law.
                We require partners to protect your information with the same high standards.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Your Choices</h2>
              <p className="text-slate-300 leading-7">
                You can access, update, or delete your account information through your dashboard.
                You may also contact support to manage communication preferences and privacy settings.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-dark-900 p-10">
              <h2 className="mb-4 text-2xl font-semibold text-white">Policy Updates</h2>
              <p className="text-slate-300 leading-7">
                We may update this privacy policy to reflect new features or regulatory requirements.
                When changes are made, we will post the updated policy on this page with a revised effective date.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
