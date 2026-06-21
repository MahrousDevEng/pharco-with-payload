import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

const BASE = 'https://pharco-2025.vercel.app'

const STATIC_ROUTES = [
  '/',
  '/about-our-story',
  '/history',
  '/about-leadership',
  '/about-pharco-group',
  '/about-impact-csr',
  '/products-overview',
  '/products-therapeutic-areas',
  '/product-detail',
  '/science-rd',
  '/science-manufacturing',
  '/science-quality',
  '/global-presence',
  '/life-at-pharco',
  '/news-events',
  '/careers',
  '/careers/apply',
  '/contact',
]

// Sample dynamic slugs present in Phase 1 static content
const NEWS_SLUGS = [
  'pharco-signs-strategic-distribution-partnership',
  'european-pharmaceuticals-receives-eu-gmp-recertification',
]
const EVENT_SLUGS = [
  'cphi-worldwide-2024',
  'africa-health-2024',
  'pharco-open-day-2025',
  'who-africa-pharma-access-summit-2024',
  'world-hepatitis-day-2024',
  'arab-health-2024',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }))

  const newsEntries = NEWS_SLUGS.map((slug) => ({
    url: `${BASE}/news-events/${slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const eventEntries = EVENT_SLUGS.map((slug) => ({
    url: `${BASE}/news-events/events/${slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const productEntries = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${encodeURIComponent(p.n)}`,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  return [...staticEntries, ...newsEntries, ...eventEntries, ...productEntries]
}
