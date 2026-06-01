"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import CurrencyCompare from './CurrencyCompare'

const services = [
	{
		id: 'investment-consultancy',
		title: 'Investment Consultancy',
		desc: "We do in-depth work on formulating clients' investment strategies, helping them fulfill their investment dreams.",
		img: '/investment-consultancy-sm.jpg',
	},
	{
		id: 'crypto-investment',
		title: 'Cryptocurrency Investment',
		desc: 'Virtual or crypto currencies like Bitcoin and Ethereum are definitely by far the hottest investment.',
		img: '/crypto-investment-sm.jpg',
	},
	{
		id: 'forex-trading',
		title: 'Forex Trading',
		desc: 'The Forex market also referred to as the "Currency market", it is the largest and most liquid market in the world.',
		img: '/forex-investment-sm.jpg',
	},
	{
		id: 'stock-commodities',
		title: 'Stock & Commodities',
		desc: 'Stock & Commodities can actually reduce overall risk as a part of a diversified portfolio.',
		img: '/hero_light.png',
	},
	{
		id: 'real-estate',
		title: 'Real Estate Investment',
		desc: 'Investing in real estate has become increasingly popular and can be a reliable long-term asset.',
		img: '/stats_bg_light.png',
	},
	{
		id: 'cannabis',
		title: 'Cannabis Investment',
		desc: 'Cannabis is an emerging investment sector in markets where it is legal; consider regulatory risk.',
		img: '/window.svg',
	},
]

export default function Services() {
	const [showAll, setShowAll] = useState(false)

	const displayed = showAll ? services : services.slice(0, 3)

	return (
		<section className="py-12" >
			<div className="container mx-auto px-4">
				<div className="text-center">
					<div className="uppercase text-sm font-bold text-emerald-300">OUR SERVICES</div>
					<h2 className="my-4 text-black text-2xl md:text-3xl">Bring to the table win-win survival strategies to ensure proactive domination.</h2>
					<div className="divider mx-auto my-4" style={{ width: 80, height: 4 }} />
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
					{displayed.map((s) => (
						<div key={s.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
							<div className="relative h-48 w-full">
								<Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} />
							</div>
							<div className="p-4">
								<h3 className="font-semibold text-lg mb-2">{s.title}</h3>
								<p className="text-sm text-slate-700">{s.desc}</p>
							</div>
						</div>
					))}
				</div>

				<div className="text-center my-6">
					<button
						aria-expanded={showAll}
						onClick={() => setShowAll((v) => !v)}
						className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-emerald-300"
					>
						{showAll ? 'SHOW LESS' : 'READ MORE'}
					</button>
				</div>
            <CurrencyCompare />
			</div>
		</section>
	)
}