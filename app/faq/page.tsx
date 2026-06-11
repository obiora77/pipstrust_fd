"use client"

import NavBar from "@/components/layout/NavBar"
import Footer from "@/components/layout/Footer"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function FAQ() {
   return (
      <div className="min-h-screen bg-dark-950 text-white">
         <NavBar />
         <div className="mx-auto max-w-3xl px-6 py-20">
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-xl shadow-black/30">
               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_45%)]" />
               <div className="relative space-y-6">
                  <div>
                     <h2 className="mb-3 text-3xl font-bold">Frequently Asked Questions</h2>
                     <p className="text-lg text-slate-400">Find answers to common questions about PipsTrust.</p>
                  </div>
                  <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="q1">
                     <AccordionTrigger>How do I open an account?</AccordionTrigger>
                     <AccordionContent>
                        Creating an account is simple — click the Register button, fill in your
                        details, and verify your email. Once verified you can deposit funds
                        and start investing.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                     <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
                     <AccordionContent>
                        We currently support bank transfers and major debit/credit cards. More
                        options may be added in the future.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                     <AccordionTrigger>How does withdrawal work?</AccordionTrigger>
                     <AccordionContent>
                        Withdrawals are processed within 1-3 business days depending on your
                        bank. You can request a withdrawal from the dashboard.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                     <AccordionTrigger>Is my money secure?</AccordionTrigger>
                     <AccordionContent>
                        Yes — we use industry-standard encryption and secure storage practices
                        to protect user funds and data. For more details see our Privacy and
                        Security documentation.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                     <AccordionTrigger>What is the minimum deposit amount?</AccordionTrigger>
                     <AccordionContent>
                        The minimum deposit varies by plan: Starter plan requires $100, Gold plan requires $1,000, and VIP plan requires $5,000.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                     <AccordionTrigger>How long does it take to receive returns?</AccordionTrigger>
                     <AccordionContent>
                        Returns are calculated based on your chosen plan duration. Starter plans last 7 days, Gold plans 14 days, and VIP plans 30 days. Returns are credited after the plan period ends.
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q7">
                     <AccordionTrigger>Can I withdraw my funds early?</AccordionTrigger>
                     <AccordionContent>
                        Early withdrawals are subject to applicable fees. Please contact our support team to discuss withdrawal options for your specific plan.
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
               </div>
            </section>
         </div>
         <Footer />
      </div>
   )
}