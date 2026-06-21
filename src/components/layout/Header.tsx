"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/data/nav";
import { Icon } from "@/components/icons";
import { Facebook, Instagram, Youtube, Menu, X, ChevronDown } from "lucide-react";

const LANGUAGES = [
  {
    code: "RO",
    name: "Romania",
    flag: "https://hatscripts.github.io/circle-flags/flags/ro.svg",
    url: "https://pharco.ro/en/homepage/",
  },
  {
    code: "SA",
    name: "KSA",
    flag: "https://hatscripts.github.io/circle-flags/flags/sa.svg",
    url: "#",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/PharcoCorporation/?ref=bookmarks",
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/pharco_pharmaceuticals/",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCV67ZLtHH1g63WfFm-4ifOA",
    icon: <Youtube className="w-4 h-4" />,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileSub(null);
    setMobileLangOpen(false);
  }, [pathname]);

  const activeId = NAV.find(
    (n) => n.href === pathname || n.subs.some((s) => s.href === pathname)
  )?.id;

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      data-screen-label="Site header"
    >
      <div className="site-topbar">
        <div className="row">
          <div className="topbar-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="topbar-logo">
            <Link href="/">
              <Image
                src="/images/w-logo.png"
                alt="Pharco"
                width={140}
                height={48}
                priority
              />
            </Link>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" aria-label="Search">
              {Icon.search}
            </button>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact Us</Link>
            <a href="#" className="lang-link">
              العربية
            </a>
            <div className="lang-selector flex" ref={langRef}>
              <button
                className="icon-btn lang-btn"
                aria-label="Select region"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {Icon.globe}
                <span className={`lang-chev${langOpen ? " open" : ""}`}>
                  {Icon.chev}
                </span>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {LANGUAGES.map((lang) => (
                    <a
                      key={lang.code}
                      href={lang.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lang-option"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.name}
                        width={20}
                        height={20}
                        className="lang-flag"
                      />
                      <span>{lang.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="nav-row">
        <Link className="scrolled-logo" href="/">
          <Image
            src="/images/logo.png"
            alt="Pharco"
            width={140}
            height={44}
            priority
          />
        </Link>
        <Link className="mobile-logo" href="/" aria-label="Pharco home">
          <Image
            src="/images/logo.png"
            alt="Pharco"
            width={120}
            height={40}
            priority
          />
        </Link>
        <nav className="main-nav">
          {NAV.map((item) => (
            <div
              key={item.id}
              className={`nav-item${activeId === item.id ? " active" : ""}`}
            >
              <Link href={item.href} className="nav-link">
                {item.label}
                {item.subs.length > 0 && Icon.chev}
              </Link>
              {item.subs.length > 0 && (
                <div className="dropdown">
                  {item.subs.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={pathname === s.href ? "active" : ""}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="nav-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X strokeWidth={2.2} /> : <Menu strokeWidth={2.2} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer-backdrop${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`mobile-drawer${mobileOpen ? " open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-head">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Pharco"
              width={120}
              height={40}
            />
          </Link>
          <button
            className="mobile-drawer-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X strokeWidth={2.2} />
          </button>
        </div>

        {/* Search */}
        <form
          className="mobile-drawer-search"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <span className="mobile-drawer-search-icon">{Icon.search}</span>
          <input
            type="search"
            value={mobileSearch}
            onChange={(e) => setMobileSearch(e.target.value)}
            placeholder="Search Pharco…"
            aria-label="Search Pharco"
          />
          {mobileSearch && (
            <button
              type="button"
              className="mobile-drawer-search-clear"
              aria-label="Clear search"
              onClick={() => setMobileSearch("")}
            >
              <X strokeWidth={2.5} />
            </button>
          )}
        </form>

        <nav className="mobile-nav">
          {NAV.map((item) => {
            const hasSubs = item.subs.length > 0;
            const open = openMobileSub === item.id;
            return (
              <div
                key={item.id}
                className={`mobile-nav-item${open ? " open" : ""}${
                  activeId === item.id ? " active" : ""
                }`}
              >
                <div className="mobile-nav-row">
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {hasSubs && (
                    <button
                      className="mobile-nav-toggle"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={open}
                      onClick={() => setOpenMobileSub(open ? null : item.id)}
                    >
                      <ChevronDown strokeWidth={2} />
                    </button>
                  )}
                </div>
                {hasSubs && (
                  <div className="mobile-nav-subs">
                    {item.subs.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className={pathname === s.href ? "active" : ""}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mobile-drawer-foot">
          <Link href="/careers" onClick={() => setMobileOpen(false)}>
            Careers
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>

          {/* Language + Region */}
          <div className="mobile-drawer-lang">
            <a
              href="#"
              className="mobile-drawer-lang-link"
              onClick={() => setMobileOpen(false)}
            >
              العربية
            </a>
            <div
              className={`mobile-drawer-region${
                mobileLangOpen ? " open" : ""
              }`}
            >
              <button
                type="button"
                className="mobile-drawer-region-btn"
                aria-expanded={mobileLangOpen}
                aria-label="Select region"
                onClick={() => setMobileLangOpen((v) => !v)}
              >
                <span className="mobile-drawer-region-icon">{Icon.globe}</span>
                <span>Region</span>
                <ChevronDown
                  strokeWidth={2}
                  className="mobile-drawer-region-chev"
                />
              </button>
              {mobileLangOpen && (
                <div className="mobile-drawer-region-menu">
                  {LANGUAGES.map((lang) => (
                    <a
                      key={lang.code}
                      href={lang.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-drawer-region-option"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.name}
                        width={20}
                        height={20}
                        className="lang-flag"
                      />
                      <span>{lang.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mobile-drawer-socials">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </header>
  );
}
