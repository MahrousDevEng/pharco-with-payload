import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { titleFont, textFont } from '@/lib/fonts'

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
    <html lang="en" className={`${titleFont.variable} ${textFont.variable}`}>
      <body suppressHydrationWarning>
        {/* TODO(foundational): <Header/> … <Footer/> <ScrollToTop/> <Toaster/> (tasks T009/T014/T015) */}
        {children}
      </body>
    </html>
  )
}
