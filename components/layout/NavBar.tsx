"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `transition-colors ${pathname === path ? 'text-gold-400 font-semibold' : 'text-dark-300 hover:text-gold-400'}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-800/50 bg-dark-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
            <span className="text-dark-950 font-display font-bold text-sm">P</span>
          </div>
          <span className="font-display font-bold text-xl">PipsTrust</span>
        </Link>

        <button
          onClick={() => setIsOpen((state) => !state)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-dark-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/about" className={linkClass('/about')}>About</Link>
          <Link href="/plans" className={linkClass('/plans')}>
            Investments Plans
          </Link>
          <a href="#features" className="hover:text-gold-400 transition-colors text-dark-300">
            Features
          </a>
          <Link href="/faq" className={linkClass('/faq')}>
            FAQ
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-dark-300 hover:text-white transition-colors px-4 py-2">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="text-sm bg-gold-gradient text-dark-950 font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-950 border-t border-dark-800/50">
          <div className="px-6 py-4 space-y-3 text-sm text-dark-300">
            <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              About
            </Link>
            <Link href="/plans" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              Investments Plans
            </Link>
            <Link href="/features" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              Features
            </Link>
            <Link href="/faq" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block hover:text-gold-400 transition-colors">
              Contact
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="block text-sm text-dark-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setIsOpen(false)}
              className="block text-sm bg-gold-gradient text-dark-950 font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
