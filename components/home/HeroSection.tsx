"use client"

import { ArrowRight, ChevronDown, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const stats = [
  { label: 'Total Investors', value: '12,400+' },
  { label: 'Total Payouts', value: '$8.2M+' },
  { label: 'Active Plans', value: '5' },
  { label: 'Countries', value: '40+' },
]

function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero_investment_sm");
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="absolute inset-0 pointer-events-none brightness-50"
        />
      )}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/3 rounded-full blur-3xl" />
      </div>

        <div className="max-w-4xl mx-auto text-center relative" data-aos="zoom-out-up">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 text-gold-400 text-sm font-medium mb-8">
            <Star size={12} className="fill-gold-400" />
            Trusted by 12,000+ investors worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            Grow Your Wealth
            <span className="block text-transparent bg-clip-text bg-gold-gradient">
              With Confidence
            </span>
          </h1>

          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            PipsTrust is a professional investment platform offering fixed returns on crypto, forex, stocks, and real estate. Start with as little as $100.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-gold-gradient text-dark-950 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-base">
              Start Investing Today
              <ArrowRight size={18} />
            </Link>
            <a href="#plans" className="inline-flex items-center gap-2 bg-dark-800 border border-dark-600 text-white px-8 py-4 rounded-xl hover:border-gold-500/40 transition-all text-base">
              View Plans
              <ChevronDown size={18} />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-gold-400">{s.value}</p>
              <p className="text-xs text-dark-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default HeroSection