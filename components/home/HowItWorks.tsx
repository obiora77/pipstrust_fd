'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { ShieldCheck, TrendingUp, Users, UserPlus, CreditCard, Coins, Icon } from "lucide-react"

const about = [
  {
    id: 'First',
    title: 'Security First',
    desc: 'We prioritize the security of your investments with advanced encryption and multi-layered protection.',
    icon: <ShieldCheck className="text-white" />,
  },
  {
    id: 'Second',
    title: 'Consistent Returns',
    desc: 'Our proven strategies and expert team work tirelessly to deliver consistent returns on your investments.',
    icon: <TrendingUp className="text-white" />,
  },
  {    
    id: 'Third',
    title: 'Global Community',
    desc: 'Join a thriving community of investors worldwide who trust us to grow their wealth.',
    icon: <Users className="text-white" />,
  }
]

const steps = [
  {
    number: '01',
    title: 'Create\nAccount',
    description: 'Create and verify your account for free to get started.',
    icon: <UserPlus size={28} />,
  },
  {
    number: '02',
    title: 'Make\nDeposit',
    description: 'After account verification, make deposits from the funding page in your dashboard.',
    icon: <CreditCard size={28} />,
  },
  {
    number: '03',
    title: 'Earn &\nGet Paid',
    description: 'You can make withdrawals as soon as you start making profits.',
    icon: <Coins size={28} />,
  },
]

export default function HowItWorks() {
  const summaryImage = PlaceHolderImages.find((p) => p.id === 'about-summary-image');

  return (
    <>
      <div className="bg-white">
        <div className="container py-5">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="">
              <h2 className="mb-4 text-3xl text-black font-bold font-headline md:text-4xl">
                A Trusted Partner for Your Financial Growth
              </h2>
              <p className="mb-6 text-muted-foreground">
                PipsTrust is dedicated to providing a secure and reliable
                platform for individuals seeking to grow their wealth. Our mission
                is to democratize investment opportunities with transparency and
                cutting edge technology.
              </p>
              <ul className="mb-8 space-y-4">
                {about.map((item) => (
                  <li key={item.id} className="flex items-start gap-4">
                    <div className="rounded-full p-3" 
                      style={{ backgroundColor: '#10b981' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button asChild variant="link" className="p-0 text-emerald-300 font-medium">
                <Link href="/about">Learn more about us &rarr;</Link>
              </Button>
            </div>
            <div className="col-md-5">
              {summaryImage && (
                <Image
                  src={summaryImage.imageUrl}
                  alt={summaryImage.description}
                  width={600}
                  height={400}
                  data-ai-hint={summaryImage.imageHint}
                  className="rounded-lg shadow-lg img-thumbnail p-3"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <section
      className="relative py-16 px-6 overflow-hidden"
        style={{ backgroundColor: '#10b981' }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Heading */}
      <div className="text-center mb-14 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
          Three Simple Steps To Start<br />Earning
        </h2>
      </div>

      {/* Steps row */}
      <div className="relative flex items-center justify-center max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Circle card */}
            <div className="flex flex-col items-center">
              <div
                className="relative bg-white rounded-full flex flex-col items-center justify-center text-center shadow-lg gap-1.5"
                style={{ width: 250, height: 250, padding: '24px' }}
              >
                {/* Number badge */}
                <span
                  className="absolute -top-0 right-6 w-9 h-9 rounded-full text-white text-sm font-bold flex items-center justify-center"
                  style={{ backgroundColor: '#10b981' }}
                >
                  {step.number}
                </span>

                <div className="w-50 h-50 rounded-full border-4 border-teal-500 flex flex-col items-center justify-center p-6 gap-2 hover:border-r-emerald-500">
                  {/* Icon placeholder — swap with Lucide icon */}
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: '#10b981' }}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <p
                    className="text-xs font-extrabold uppercase tracking-wide leading-tight text-[#1a1a2e]"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {step.title}
                  </p>

                  {/* Description inside circle */}
                  <p className="text-[11px] text-gray-500 leading-snug max-w-[138px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Dashed arrow connector */}
            {index < steps.length - 1 && (
              <div
                className="flex items-center shrink-0 -mt-16"
                style={{ width: 90 }}
              >
                <div
                  className="flex-1 border-t-2 border-dashed"
                  style={{ borderColor: 'rgba(255,255,255,0.45)' }}
                />
                {/* Arrowhead */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderLeft: '10px solid rgba(255,255,255,0.6)',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </>
  )
}