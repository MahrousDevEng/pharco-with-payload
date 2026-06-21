import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/global/ScrollToTop'
import RevealInit from '@/components/global/RevealInit'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  metadataBase: new URL('https://pharco-2025.vercel.app'),
  title: {
    default: 'Pharco Corporation',
    template: '%s · Pharco Corporation',
  },
  description:
    'Egyptian pharmaceutical pioneer developing therapies that improve global health since 1957.',
  openGraph: {
    type: 'website',
    siteName: 'Pharco Corporation',
    title: 'Pharco Corporation',
    description:
      'Egyptian pharmaceutical pioneer developing therapies that improve global health since 1957.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <RevealInit />
        <Toaster />
      </body>
    </html>
  )
}
