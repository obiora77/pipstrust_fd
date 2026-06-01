import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Providers } from '@/components/layout/Providers'

export const metadata: Metadata = {
  title: { default: 'PipsTrust — Professional Investment Platform', template: '%s | PipsTrust' },
  description: 'Grow your wealth with PipsTrust — crypto, forex, stocks, and real estate investments with guaranteed returns.',
  keywords: ['investment', 'crypto', 'forex', 'trading', 'PipsTrust'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#171717',
                color: '#f5f5f5',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#f59e0b', secondary: '#0a0a0a' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#0a0a0a' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
