'use client'

import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, Zap, Globe, ChevronDown, Star } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Bank-Grade Security', desc: 'All funds are secured with military-grade encryption and multi-layer protection.' },
  { icon: Zap, title: 'Instant Withdrawals', desc: 'Request and receive your earnings instantly with no hidden delays.' },
  { icon: TrendingUp, title: 'Guaranteed ROI', desc: 'Fixed returns on every investment plan — know exactly what you will earn.' },
  { icon: Globe, title: 'Global Access', desc: 'Invest from anywhere in the world with support for crypto and bank transfers.' },
]
export default function Features() {
  return (
    <div>
      {/* Features */}
      <section id="features" className="py-20 px-6 bg-dark-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Choose PipsTrust?</h2>
            <p className="text-dark-400">Built for serious investors who demand transparency and results</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 bg-dark-800 rounded-2xl card-glow">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-dark-800 border border-gold-500/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-gradient opacity-5 rounded-3xl" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 relative">
              Ready to Start Earning?
            </h2>
            <p className="text-dark-400 mb-8 relative">Join thousands of investors already growing their wealth with PipsTrust.</p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-gold-gradient text-dark-950 font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 relative">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
