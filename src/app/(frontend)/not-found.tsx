import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-titleFont text-6xl text-primary">404</p>
      <h1 className="font-textFont mt-4 text-2xl text-secondary">Page not found</h1>
      <p className="font-textFont mt-2 max-w-md text-secondary">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full border-2 border-primary bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-white hover:text-primary"
      >
        Back to home
      </Link>
    </main>
  )
}
