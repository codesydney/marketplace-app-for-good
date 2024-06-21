import { PropsWithChildren } from 'react'
import { GeistSans } from 'geist/font/sans'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { AppProviders } from './providers'
import ToasterProvider from '@/providers/ToasterProvider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Marketplace App for Good',
  description: '',
}

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground prose max-w-full">
        <AppProviders>
          <main className="flex h-full min-h-screen flex-col items-center bg-slate-200">
            {children}
          </main>
        </AppProviders>
        <ToasterProvider />
      </body>
    </html>
  )
}
