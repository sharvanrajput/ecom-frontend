"use client";

import { assets } from "@/public/frontend_assets/assets";
import Image from "next/image";
import Link from "next/link";
 
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { ShopContext } from "@/context/ShopContext";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { productCount } = useContext(ShopContext);
  const cartCount = productCount();

  const linkClass = (href) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "text-orange-600"
        : "text-slate-600 hover:text-slate-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link href={"/"}>
            <Image src={assets.logo} className="w-36" alt="" />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 md:inline-flex"
            >
              Sign in
            </Link>

            <Link
              href="/cart"
              aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              className="relative rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 8H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-semibold leading-none text-white"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              className="rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`${menuOpen ? "block" : "hidden"} border-t border-slate-100 py-3 md:hidden`}
        >
          <div className="flex flex-col">
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              className={linkClass("/login")}
              aria-current={pathname === "/login" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
