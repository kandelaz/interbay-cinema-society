"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Festival",
    href: "/festival",
    children: [
      { label: "Engauge 2025", href: "/festival/2025" },
      { label: "Engauge 2024", href: "/festival/2024" },
      { label: "Submit a Film", href: "/festival/submit" },
      { label: "Archive", href: "/festival/archive" },
    ],
  },
  {
    label: "Grants",
    href: "/grants",
    children: [
      { label: "ICS Grants", href: "/grants" },
      { label: "Apply", href: "/grants/apply" },
      { label: "Past Recipients", href: "/grants/recipients" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Education", href: "/education" },
  { label: "Rentals", href: "/rentals" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <span className="font-[family-name:var(--font-serif)] text-sm font-semibold tracking-widest uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Interbay Cinema Society
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3.5 py-5 text-xs font-medium tracking-widest uppercase text-[var(--accent-dim)] hover:text-[var(--foreground)] transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-2.5 h-2.5 mt-0.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 w-52 bg-[var(--surface-2)] border border-[var(--border)] shadow-2xl py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-xs tracking-wider uppercase text-[var(--accent-dim)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a
              href="https://www.networkforgood.org/donation/MakeDonation.aspx?ORGID2=823819440"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 text-xs font-semibold tracking-widest uppercase bg-[var(--red)] text-white hover:bg-red-500 transition-colors"
            >
              Donate
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[var(--accent-dim)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[var(--border)] bg-[var(--surface-2)]">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-6 py-3.5 text-xs font-medium tracking-widest uppercase text-[var(--accent-dim)] hover:text-[var(--foreground)] border-b border-[var(--border)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="bg-[var(--background)]">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block pl-10 pr-6 py-3 text-xs tracking-wider uppercase text-[var(--accent-dim)] opacity-70 hover:opacity-100 hover:text-[var(--foreground)] border-b border-[var(--border)] transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="https://www.networkforgood.org/donation/MakeDonation.aspx?ORGID2=823819440"
            target="_blank"
            rel="noopener noreferrer"
            className="block m-4 px-5 py-3 text-xs font-semibold tracking-widest uppercase text-center bg-[var(--red)] text-white"
          >
            Donate
          </a>
        </nav>
      )}
    </header>
  );
}
