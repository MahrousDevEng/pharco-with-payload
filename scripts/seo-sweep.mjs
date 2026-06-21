import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const ROOT = 'src/app/(frontend)'
const MAP = {
  'about-our-story': ['Our Story', "Pharco Corporation's journey since 1957 — from an Alexandria pharmacy to an Egyptian pharmaceutical pioneer advancing accessible, innovative medicines."],
  'history': ['Our History', 'Six decades of Pharco milestones — key moments from 1957 to today in research, manufacturing, and global pharmaceutical access.'],
  'about-leadership': ['Leadership', 'Meet the Pharco Corporation leadership team guiding our mission to deliver high-quality, affordable medicines worldwide.'],
  'about-pharco-group': ['The Pharco Group', 'The companies of the Pharco Group — an integrated pharmaceutical network spanning R&D, manufacturing, and distribution across MENA and beyond.'],
  'about-impact-csr': ['Our Impact & Responsibility', "Pharco's social impact and CSR — from hepatitis C elimination to community health programmes improving lives across Egypt and Africa."],
  'products-overview': ['Products Overview', "Explore Pharco's portfolio of branded generics across antimicrobial, cardiometabolic, respiratory, CNS, and more therapeutic areas."],
  'products-therapeutic-areas': ['Therapeutic Areas', "Pharco's medicines organised by therapeutic area — primary care, antimicrobials, oncology, women's health, and beyond."],
  'product-detail': ['Product Detail', 'Detailed product information from Pharco Corporation, including indications, composition, and prescribing guidance for healthcare professionals.'],
  'science-rd': ['Research & Development', "Pharco's R&D — advancing new therapies and affordable innovation through advanced research, technology, and scientific collaboration."],
  'science-manufacturing': ['Manufacturing Excellence', "Pharco's EU-GMP-certified manufacturing — world-class facilities producing high-quality medicines at scale across multiple sites."],
  'science-quality': ['Quality & Compliance', "Pharco's quality and compliance standards — ISO certifications, GMP alignment, and international regulatory approvals behind every product."],
  'global-presence': ['Global Presence', "Pharco's reach across MENA, Africa, Europe, and Asia — partnerships and distribution bringing accessible medicines to global markets."],
  'life-at-pharco': ['Life at Pharco', 'Life at Pharco — culture, people, and careers at an Egyptian pharmaceutical pioneer employing thousands across Egypt, Romania, and Algeria.'],
  'news-events': ['News & Events', 'Latest news, press releases, and events from Pharco Corporation and the Pharco Group.'],
  'careers': ['Careers', 'Build your career at Pharco — explore roles across manufacturing, R&D, quality, commercial, and corporate functions.'],
  'careers/apply': ['Apply', 'Apply to join Pharco Corporation — submit your application for open roles across our pharmaceutical operations.'],
  'contact': ['Contact', 'Get in touch with Pharco Corporation — one enquiry form routed to the right team for partnerships, media, careers, and general questions.'],
}

let done = 0
for (const [route, [title, description]] of Object.entries(MAP)) {
  const file = `${ROOT}/${route}/page.tsx`
  if (!existsSync(file)) { console.log('MISSING', file); continue }
  let src = readFileSync(file, 'utf8')

  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const metaLine = `export const metadata = pageMeta({\n  title: "${esc(title)}",\n  description: "${esc(description)}",\n})`

  // replace existing `export const metadata = { ... };`
  src = src.replace(/export const metadata\s*=\s*\{[^}]*\};?/, metaLine)

  // ensure import present
  if (!src.includes('@/lib/seo')) {
    src = `import { pageMeta } from "@/lib/seo";\n` + src
  }
  writeFileSync(file, src)
  done++
}
console.log('rewrote', done, 'pages')
