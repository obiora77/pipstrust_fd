"use client"

import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, ScrollSmoother } from 'gsap/all'
import HeroSection from '@/components/home/HeroSection'
import HowItWorks from '@/components/home/HowItWorks'
import CryptoMarquee from '@/components/home/CryptoMarquee'
import Features from '@/components/home/Features'
import Services from '@/components/home/Services'
import CustomerChat from '@/components/home/CustomerChat'
import { Testimonials } from '@/components/home/testimonials'
import { ArrowRight, TrendingUp, Shield, Zap, Globe, ChevronDown, Star } from 'lucide-react'
import Floating from '@/components/home/Floating'
import { InvestmentPlans } from '@/components/home/InvestmentPlans'
import { useEffect, useState } from 'react'
import Preloader from '@/components/Preloader'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const timeout = window.setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => window.clearTimeout(timeout)
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    })
  });

  return (
    <main>
      <Preloader isLoaded={isLoaded} onFinish={() => setIsPreloaderDone(true)} />
      <div className={!isPreloaderDone ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <NavBar />
        <CryptoMarquee />
   
            <HeroSection isPreloaderDone={isPreloaderDone} />
            <HowItWorks />
            <CustomerChat />
            <div>
              <InvestmentPlans/>
              <Features />
            </div>
            <Services />
            <Testimonials />
            <Floating />
            <Footer />
      </div>
    </main>
  )
}

"min-h-screen bg-dark-950 text-white"