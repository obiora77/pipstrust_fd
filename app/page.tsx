import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import HowItWorks from '@/components/home/HowItWorks'
import CryptoMarquee from '@/components/home/CryptoMarquee'
import Features from '@/components/home/Features'
import Services from '@/components/home/Services'
import { Testimonials } from '@/components/home/testimonials'
import { ArrowRight, TrendingUp, Shield, Zap, Globe, ChevronDown, Star } from 'lucide-react'
import Floating from '@/components/home/Floating'



const plans = [
  { name: 'Starter', roi: '5%', duration: '7 days', min: '$100', max: '$999', featured: false },
  { name: 'Gold',    roi: '12%', duration: '14 days', min: '$1,000', max: '$4,999', featured: true },
  { name: 'VIP',     roi: '25%', duration: '30 days', min: '$5,000', max: 'Unlimited', featured: false },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />
      <CryptoMarquee />
      <HeroSection />
      <HowItWorks />
      

      {/* Plans */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Investment Plans</h2>
            <p className="text-dark-400">Choose a plan that fits your budget and goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-6 card-glow transition-all duration-300 hover:-translate-y-1 ${
                plan.featured ? 'bg-dark-800 border border-gold-500/40' : 'bg-dark-800'
              }`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-dark-950 text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                  <div className="text-4xl font-display font-bold text-gold-400 mt-3">{plan.roi}</div>
                  <div className="text-sm text-dark-400 mt-1">ROI over {plan.duration}</div>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-400">Min Deposit</span>
                    <span className="text-white font-medium">{plan.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Max Deposit</span>
                    <span className="text-white font-medium">{plan.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Duration</span>
                    <span className="text-white font-medium">{plan.duration}</span>
                  </div>
                </div>
                <Link href="/auth/register" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? 'bg-gold-gradient text-dark-950 hover:opacity-90'
                    : 'bg-dark-700 text-white hover:bg-dark-600'
                }`}>
                  Invest Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Features />
      <Services />
      <Testimonials />

      
      <Floating />

      

      <Footer />
    </div>
  )
}