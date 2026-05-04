"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Strona główna", href: "/" },
  { label: "Wiek", href: "/#wiek" },
  { label: "Nowości", href: "/#nowosci" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kontakt", href: "/kontakt" }
];

export default function Header({ active = "home" }: { active?: "home" | "shop" | "contact" | "cart" | "checkout" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 uppercase sm:gap-3">
          <img
            src="/logo.png"
            alt="Akademia Małego Detektywa"
            className="h-10 w-auto object-contain sm:h-12"
          />
          <span className="min-w-0 leading-none">
            <strong className="block font-display text-[0.9rem] text-white sm:text-base">Akademia</strong>
            <span className="block font-display text-[0.68rem] text-gold sm:text-xs">Małego Detektywa</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-black uppercase md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition hover:text-gold ${
                (active === "shop" && item.label === "Sklep") ||
                (active === "contact" && item.label === "Kontakt")
                  ? "text-gold"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <Link
            href="/koszyk"
            aria-label="Koszyk"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 transition hover:border-gold/60 hover:text-gold ${
              active === "cart" || active === "checkout" ? "text-gold" : ""
            }`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M7 7h10l-1 8H8L7 7Zm0 0-.5-2H4m5 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.62rem] font-black text-navy">
              0
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">☰</span>
        </button>
      </div>

      {open && (
        <nav className="container grid gap-2 pb-5 text-sm font-black uppercase md:hidden">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl bg-white/5 px-4 py-3"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/koszyk"
            className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
            onClick={() => setOpen(false)}
          >
            <span>Koszyk</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.62rem] font-black text-navy">
              0
            </span>
          </Link>
        </nav>
      )}
    </header>
  );
}
