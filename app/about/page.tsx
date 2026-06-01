import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const aboutImage = PlaceHolderImages.find(image => image.id === 'about-summary-image')

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-slate-950/80 px-6 py-20 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-emerald-300">About PipsTrust</p>
                <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Smart trading built for modern investors.
                </h1>
                <p className="mb-8 max-w-xl text-lg leading-8 text-slate-300">
                  PipsTrust combines powerful market insights, secure account management,
                  and expert customer support to help you grow with confidence. Our platform
                  is designed for traders who want clarity, speed, and trust in every move.
                </p>
                <div className="space-y-4 text-sm text-slate-300 sm:space-y-0 sm:flex sm:items-center sm:space-x-6">
                  <div>
                    <span className="block text-3xl font-semibold text-white">24/7</span>
                    <span>support across all channels</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-semibold text-white">100%</span>
                    <span>secure payment & data protection</span>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/20">
                <Image
                  src={aboutImage?.imageUrl ?? '/GIFfinal_1VVV.gif'}
                  alt={aboutImage?.imageHint ?? 'About PipsTrust'}
                  width={860}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-12 px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Our Mission</h2>
              <p className="text-slate-300">
                We empower traders with simple, secure access to the markets and a platform
                built around transparency, automation, and consistent performance.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Why Choose Us</h2>
              <p className="text-slate-300">
                Every feature is designed for clarity: from portfolio tracking to deposits,
                withdrawals, and account analytics. We remove obstacles so you can focus on trading.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">Built with Trust</h2>
              <p className="text-slate-300">
                Our platform uses secure infrastructure, strong encryption, and industry best practices
                to protect your funds and personal information.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 shadow-2xl shadow-slate-950/10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">What we do</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Everything you need to trade smarter.
                </h2>
                <p className="mt-5 text-slate-300">
                  From live market data to fast execution and reliable account tools, PipsTrust
                  gives you the confidence to move quickly and stay ahead of the market.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    Talk to an advisor
                  </Link>
                  <Link href="/#features" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Explore features
                  </Link>
                </div>
              </div>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
                <div>
                  <p className="text-3xl font-semibold text-white">1.2M+</p>
                  <p className="text-slate-300">Active traders</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">98%</p>
                  <p className="text-slate-300">Customer satisfaction score</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
