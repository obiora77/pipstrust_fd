"use client"

import Image from "next/image"
import { useState } from "react"
import NavBar from "@/components/layout/NavBar"
import Footer from "@/components/layout/Footer"
import { licenses } from "@/constants"
import { countryLogos } from "@/constants"

const PER_PAGE = 9;

const regionGroups = [...new Set(licenses.map(l => l.country))];

export default function LicensesPage() {
  const [page, setPage] = useState(1)
  const [activeCountry, setActiveCountry] = useState("All")

  const filtered = activeCountry === "All"
    ? licenses
    : licenses.filter(l => l.country === activeCountry)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (c: string) => {
    setActiveCountry(c)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-dark-950 px-6 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <span>⚖️</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Regulatory Compliance</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Licenses &<span className="text-primary"> Registrations</span>
          </h1>
          <p className="mb-12 text-lg text-slate-300">
            PipsTrust holds licenses and registrations across multiple jurisdictions worldwide, ensuring full compliance with global and local financial regulations.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{licenses.length}</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Total Licenses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{regionGroups.length}</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Jurisdictions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">32</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">US States</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-xs uppercase tracking-widest text-slate-400">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-white/10 bg-dark-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2">
          {["All", ...regionGroups].map((c) => (
            <button
              key={c}
              onClick={() => handleFilter(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCountry === c
                  ? "bg-primary/20 text-primary ring-1 ring-primary/50"
                  : "border border-white/10 text-slate-300 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {c === "United States" ? "🇺🇸 " : c === "Canada" ? "🇨🇦 " : c === "Switzerland" ? "🇨🇭 " : c === "Australia" ? "🇦🇺 " : c === "Hong Kong" ? "🇭🇰 " : c === "Lithuania" ? "🇱🇹 " : ""}
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Verified Licenses</p>
          <h2 className="text-3xl font-bold tracking-tight">
            {activeCountry === "All" ? "All Jurisdictions" : activeCountry}
            <span className="ml-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-base font-medium text-primary">{filtered.length}</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((lic, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-dark-900 p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-dark-900 p-1 shadow-sm">
                    {countryLogos[lic.country] ? (
                      <Image
                        src={countryLogos[lic.country]}
                        alt={`${lic.country} flag`}
                        width={40}
                        height={28}
                        className="block"
                      />
                    ) : (
                      <span className="text-2xl">{lic.flag}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{lic.country}</p>
                    {lic.region && <p className="text-sm text-slate-300">{lic.region}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  ✓ Active
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">{lic.authority}</h3>
              <p className="mb-6 text-base font-medium text-primary">{lic.type}</p>

              <div className="mb-6 h-px bg-white/10" />

              <div className="mb-6 space-y-3 text-sm">
                {lic.ref !== "—" && (
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold uppercase text-slate-400">Ref No.</span>
                    <span className="font-mono text-primary">{lic.ref}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-xs font-semibold uppercase text-slate-400">Company</span>
                  <span className="text-right text-slate-200">{lic.company}</span>
                </div>
              </div>

              {lic.url !== "#" && (
                <a href={lic.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-400 opacity-70 transition-opacity hover:opacity-100">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  {lic.url.replace("https://", "").replace("http://", "").split("/")[0]}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:border-primary/50 hover:text-primary disabled:opacity-50"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border font-semibold transition-all ${
                page === p
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:border-primary/50 hover:text-primary disabled:opacity-50"
          >
            ›
          </button>
          <span className="text-sm text-slate-400">
            Page {page} of {totalPages} · {filtered.length} licenses
          </span>
        </div>

        {/* Info table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-dark-900">
          <div className="border-b border-white/10 px-8 py-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Compliance Framework</p>
            <h3 className="mt-2 text-2xl font-bold">What Being Licensed Means For You</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-primary/5">
                  <th className="px-8 py-4 text-left font-semibold text-primary">What We Provide</th>
                  <th className="px-8 py-4 text-left font-semibold text-primary">Why It Matters</th>
                  <th className="px-8 py-4 text-left font-semibold text-primary">Benefit to You</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-8 py-4 font-medium text-white">Adequate Operational Capital</td>
                  <td className="px-8 py-4 text-slate-300">Subject to minimum capital requirements and own funds obligations covering payment service risk. Funds are segregated and insured.</td>
                  <td className="px-8 py-4 text-slate-300">Your payouts are protected as entrusted to a company with adequate operating capital.</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-8 py-4 font-medium text-white">Internal & External Auditing</td>
                  <td className="px-8 py-4 text-slate-300">Our accounts are subject to mandatory additional checks by independent auditors.</td>
                  <td className="px-8 py-4 text-slate-300">Four layers of defense protecting your investments.</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-8 py-4 font-medium text-white">Anti-Money Laundering (AML) Policies</td>
                  <td className="px-8 py-4 text-slate-300">Risk-based approach with customer due diligence, identity verification, and screening against UN, EU, and OFAC sanction lists.</td>
                  <td className="px-8 py-4 text-slate-300">Our AML/CTF policies make us a reliable financial partner, safeguarding your business reputation.</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-8 py-4 font-medium text-white">Data Protection & Security</td>
                  <td className="px-8 py-4 text-slate-300">High-level IT security, data protection processes, strict access rights, and full data encryption.</td>
                  <td className="px-8 py-4 text-slate-300">Your sensitive information is safe and protected with us.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}