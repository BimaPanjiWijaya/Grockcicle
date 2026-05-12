"use client";
import Link from "next/link";
import { useState } from "react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/product?category=new-arrivals" },
      { label: "Best Sellers", href: "/product?category=best-sellers" },
      { label: "Drinkware", href: "/product?category=drinkware" },
      { label: "Bags", href: "/product?category=bags" },
      { label: "Barware & Coffee", href: "/product?category=barware" },
      { label: "Collabs", href: "/product?category=collabs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  },
  {
    title: "Wholesale",
    links: [
      { label: "Domestic", href: "#" },
      { label: "International", href: "#" },
      { label: "Fundraisers", href: "#" },
      { label: "Custom", href: "#" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1-.09z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-700 py-8 px-4 md:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-white">
            Nothing is free in thisworld
          </p>
          {submitted ? (
            <p className="text-sm text-gray-500 italic">
              Thanks for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="border border-l-0 border-gray-300 bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700 transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-900">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 px-4 md:px-8 py-5">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + copyright */}
          <div className="flex items-center gap-6">
            <Link
              href="/home"
              className="text-sm font-bold tracking-widest uppercase text-white"
            >
              Grockcicle
            </Link>
            <span className="text-xs text-gray-500">
              © {new Date().getFullYear()} Grockcicle. All Rights Reserved.
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
