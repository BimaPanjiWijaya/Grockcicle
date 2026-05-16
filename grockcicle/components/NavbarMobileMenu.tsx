"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Drinkware", href: "/products?category=drinkware" },
  { label: "Bags", href: "/products?category=bags" },
  { label: "Barware & Coffee", href: "/products?category=barware" },
  { label: "Collabs", href: "/products?category=collabs" },
  { label: "New Arrivals", href: "/products?category=new-arrivals" },
  { label: "Best Sellers", href: "/products?category=best-sellers" },
];

export default function NavbarMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Toggle menu"
        className="md:hidden text-gray-300 hover:text-white transition-colors"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2020/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-700 bg-gray-900 px-4 py-4 flex flex-col gap-4 absolute top-16 left-0 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-700" />
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Register
          </Link>
        </nav>
      )}
    </>
  );
}
