'use client'

import Link from "next/link"

export default function Footer() {
  return (
      <footer className="border-t border-dark-800 py-10 px-6">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gold-gradient flex items-center justify-center">
                     <span className="text-dark-950 font-bold text-xs">P</span>
                  </div>
                  <span className="font-display font-bold">PipsTrust</span>
               </div>
               <p className="text-gray-400">
                  Your trusted investment platform for growing wealth securely.
               </p>
            </div>

            {/* Quick Links */}
            <div>
               <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
               <ul className="space-y-2">
               <li>
                  <Link href="/features" className="text-gray-400 hover:text-gold-400 transition">
                     Features
                  </Link>
               </li>
               <li>
                  <Link href="/plans" className="text-gray-400 hover:text-gold-400 transition">
                     Investment Plans
                  </Link>
               </li>
               <li>
                  <Link href="/#how-it-works" className="text-gray-400 hover:text-gold-500 transition">
                     How It Works
                  </Link>
               </li>
               </ul>
            </div>

            {/* Legal */}
            <div>
               <h4 className="text-lg font-semibold mb-4">Legal</h4>
               <ul className="space-y-2">
               <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-gold-400 transition-colors">
                     Privacy Policy
                  </Link>
               </li>
               <li>
                  <Link href="/terms" className="text-gray-400  hover:text-gold-400 transition-colors">
                     Terms of Service
                  </Link>
               </li>
               <li>
                  <Link href="/contact" className="text-gray-400  hover:text-gold-400 transition-colors">
                     Contact
                  </Link>
               </li>
               </ul>
            </div>

            {/* Contact */}
            <div>
               <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
               <ul className="space-y-2 text-gray-400">
               <li>Email: support@pipstrust.com</li>
               <li>Phone: +1 (555) 123-4567</li>
               </ul>
            </div>
         </div>

         <div className="border-t border-dark-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FirePips. All rights reserved.</p>
         </div>
         </div>
      </footer>
  )
}
