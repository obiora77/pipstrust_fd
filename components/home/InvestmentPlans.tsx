"use client"

import { CheckIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const plans = [
	{ 
      id: 'starter', 
      name: 'Starter', 
      roi: '25%', 
      duration: '3 days', 
      amount: '$100 - $499', 
      min: '$100',
      features: [
         'Daily Profit Accrual',
         '24/7 Support',
         'Secure Platform',
         'Easy Withdrawal',
      ],
      popular: false,
   },
   {
      id: 'advanced',
      name: 'Advanced',
      amount: '$500 - $999',
      roi: '40%',
      min: '$500',
      duration: '7 Days',
      features: [
         'Daily Profit Accrual',
         '24/7 Priority Support',
         'Secure Platform',
         'Fast Withdrawal',
         'Personal Account Manager',
      ],
      popular: false,
   },
	{ 
      id: 'pro', 
      name: 'Pro', 
      roi: '70%', 
      duration: '14 days', 
      amount: '$1,000 - $4,999',
      min: '$1,000', 
      features: [
         'Daily Profit Accrual',
         '24/7 VIP Support',
         'Secure Platform',
         'Instant Withdrawal',
         'Dedicated Account Manager',
         'Exclusive Market Insights',
      ],
      popular: true,
   },
   {
      id: 'ultimate',
      name: 'Ultimate',
      amount: '$100,000+',
      min: '$100,000',
      roi: '90%',
      duration: '45 Days',
      features: [
         'Daily Profit Accrual',
         '24/7 Concierge Support',
         'Maximum Security',
         'Instant Withdrawal',
         'Private Account Manager',
         'Premium Market Analysis',
         'Custom Investment Strategy',
      ],
      popular: false,
   },
]

export const InvestmentPlans = () => {
  return (
    <main className="pt-20 pb-20">
         <div className="mx-auto max-w-7xl px-6">
            <header className="mx-auto max-w-2xl text-center">
               <h1 className="text-3xl font-semibold">Investment Pricing & Plans</h1>
               <p className="mt-3 text-slate-300">Choose a plan that fits your goals — transparent pricing, secure platform.</p>
            </header>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               {plans.map(plan => (
                  <Card key={plan.id} className={`${plan.popular ? 'border border-gold-500/40 bg-dark-800' : 'bg-dark-800'} rounded-2xl`}>
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <CardTitle>{plan.name}</CardTitle>
                           {plan.popular && <Badge className="bg-gold-500 text-dark-950">Popular</Badge>}
                        </div>
                        <CardDescription>
                           <div className="mt-2 text-2xl font-display text-gold-400">{plan.roi}</div>
                           <div className="text-sm text-slate-400">{plan.duration} • {plan.amount}</div>
                        </CardDescription>
                     </CardHeader>

                     <CardContent>
                        <ul className="space-y-3 text-sm text-slate-300">
                              {plan.features.map((feature, idx) => (
                                 <li key={idx} className='flex items-start'>
                                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                    <span className="text-slate-300">{feature}</span>
                                 </li>
                              ))}
                        </ul>
                     </CardContent>

                     <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                           <div className="text-sm text-slate-300">Starting at</div>
                           <div className="text-lg font-semibold">{plan.min}</div>
                        </div>
                        <Link href="/auth/login" className="flex items-center gap-3">
                           <Button variant={plan.popular ? 'default' : 'outline'}>Start Now</Button>
                        </Link>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </div>
      </main> 
  )
}
