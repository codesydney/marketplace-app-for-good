import { ReactNode } from 'react'
import { GeistSans } from 'geist/font/sans'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import ToasterProvider from '@/providers/ToasterProvider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground prose max-w-full">
        <Theme>
          <main className="flex h-full min-h-screen flex-col items-center">
            {children}
          </main>
        </Theme>
        <ToasterProvider />
      </body>
    </html>
  )
}
