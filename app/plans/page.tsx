"use client"

import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const plans = [
	{ id: 'starter', name: 'Starter', roi: '5%', duration: '7 days', min: '$100', max: '$999', featured: false },
	{ id: 'gold', name: 'Gold', roi: '12%', duration: '14 days', min: '$1,000', max: '$4,999', featured: true },
	{ id: 'vip', name: 'VIP', roi: '25%', duration: '30 days', min: '$5,000', max: '$99,999', featured: false },
]

export default function PlansPage() {
	return (
		<div className="min-h-screen bg-dark-950 text-white">
			<NavBar />

			<main className="pt-20 pb-20">
				<div className="mx-auto max-w-7xl px-6">
					<header className="mx-auto max-w-2xl text-center">
						<h1 className="text-3xl font-semibold">Pricing & Plans</h1>
						<p className="mt-3 text-slate-300">Choose a plan that fits your goals — transparent pricing, secure platform.</p>
					</header>

					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{plans.map(plan => (
							<Card key={plan.id} className={`${plan.featured ? 'border border-gold-500/40 bg-dark-800' : 'bg-dark-800'} rounded-2xl`}>
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle>{plan.name}</CardTitle>
										{plan.featured && <Badge className="bg-gold-500 text-dark-950">Popular</Badge>}
									</div>
									<CardDescription>
										<div className="mt-2 text-2xl font-display text-gold-400">{plan.roi}</div>
										<div className="text-sm text-slate-400">{plan.duration} • min {plan.min}</div>
									</CardDescription>
								</CardHeader>

								<CardContent>
									<ul className="space-y-3 text-sm text-slate-300">
										<li>Secure vault storage</li>
										<li>24/7 support</li>
										<li>Daily performance reports</li>
										<li>Fast withdrawals</li>
									</ul>
								</CardContent>

								<CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<div className="text-sm text-slate-300">Starting at</div>
										<div className="text-lg font-semibold">{plan.min}</div>
									</div>
									<div className="flex items-center gap-3">
										<Button variant={plan.featured ? 'default' : 'outline'}>Choose</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}