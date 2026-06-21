// Navigation tree: single source of truth for header + footer
export type NavSub = { label: string; href: string };
export type NavItem = {
  id: string;
  label: string;
  href: string;
  subs: NavSub[];
};

export const NAV: NavItem[] = [
  {
    id: "about",
    label: "About Pharco",
    href: "/about-our-story",
    subs: [
      { label: "History", href: "/history" },
      { label: "Our Story", href: "/about-our-story" },
      { label: "Leadership", href: "/about-leadership" },
      { label: "Pharco Group", href: "/about-pharco-group" },
      { label: "Our Impact + CSR", href: "/about-impact-csr" },
    ],
  },
  {
    id: "therapies",
    label: "Therapies & Products",
    href: "/products-overview",
    subs: [
      { label: "Products Overview", href: "/products-overview" },
      { label: "Therapeutic Areas", href: "/products-therapeutic-areas" },
    ],
  },
  {
    id: "science",
    label: "Science & Operations",
    href: "/science-rd",
    subs: [
      { label: "Research & Development", href: "/science-rd" },
      { label: "Manufacturing", href: "/science-manufacturing" },
    ],
  },
  {
    id: "global",
    label: "Global Presence",
    href: "/global-presence",
    subs: [],
  },
  {
    id: "life",
    label: "Life at Pharco",
    href: "/life-at-pharco",
    subs: [],
  },
  {
    id: "news",
    label: "News & Events",
    href: "/news-events",
    subs: [],
  },
];

export const FOOTER_GROUPS = [
  {
    title: "About Pharco",
    links: [
      { label: "Our Story", href: "/about-our-story" },
      { label: "History", href: "/history" },
      { label: "Leadership", href: "/about-leadership" },
      { label: "Pharco Group", href: "/about-pharco-group" },
      { label: "Our Impact + CSR", href: "/about-impact-csr" },
    ],
  },
  {
    title: "Therapies & Products",
    links: [
      { label: "Products Overview", href: "/products-overview" },
      { label: "Therapeutic Areas", href: "/products-therapeutic-areas" },
    ],
  },
  {
    title: "Science & Operations",
    links: [
      { label: "Research & Development", href: "/science-rd" },
      { label: "Manufacturing", href: "/science-manufacturing" },
    ],
  },
  {
    title: "Global Presence",
    links: [{ label: "Global Presence", href: "/global-presence" }],
  },
  {
    title: "Life at Pharco",
    links: [
      { label: "Life at Pharco", href: "/life-at-pharco" },
      { label: "Careers", href: "/careers" },
      { label: "Apply Now", href: "/careers/apply" },
    ],
  },
  {
    title: "News & Events",
    links: [
      { label: "News & Events", href: "/news-events" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
