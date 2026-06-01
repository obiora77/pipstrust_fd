"use client"

import { useState, type ChangeEvent, type FormEvent } from 'react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

const defaultForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(defaultForm)
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Your message has been sent successfully. We will contact you shortly.')
    setForm(defaultForm)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      <main className="pt-16">
        <section className="bg-slate-950/80 px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.32em] text-emerald-300">Contact us</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                We’re here to help you get started.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Whether you have a question about accounts, deposits, or the trading platform,
                our support team is ready to assist you 24/7.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">Name</span>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">Email</span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                        required
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Subject</span>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What can we help with?"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-300">Message</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can support you"
                      rows={6}
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Send message
                  </button>

                  {status ? (
                    <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      {status}
                    </div>
                  ) : null}
                </form>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Get in touch</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Reach our support team</h2>
                  <p className="mt-4 text-slate-300">
                    Fast support for account setup, withdrawals, deposits, and platform questions.
                  </p>
                  <div className="mt-8 space-y-4 text-sm text-slate-300">
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p>support@pipstrust.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <p>+1 (800) 555-0199</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Location</p>
                      <p>123 Trust Avenue, London, UK</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Office hours</p>
                  <ul className="mt-6 space-y-4 text-base">
                    <li>
                      <span className="block font-semibold text-white">Monday – Friday</span>
                      9:00 AM – 6:00 PM GMT
                    </li>
                    <li>
                      <span className="block font-semibold text-white">Saturday</span>
                      10:00 AM – 4:00 PM GMT
                    </li>
                    <li>
                      <span className="block font-semibold text-white">Sunday</span>
                      Closed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}