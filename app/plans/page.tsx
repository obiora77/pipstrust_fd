"use client"

import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import { InvestmentPlans } from '@/components/home/InvestmentPlans'

export default function PlansPage() {
	return (
		<div className="min-h-screen bg-dark-950 text-white">
			<NavBar />
         
            <InvestmentPlans/>
			
			<Footer />
		</div>
	)
}