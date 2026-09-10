"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AnalyticsLink from "./AnalyticsLink";

type HeaderProps = {
  active?: "home" | "shop" | "contact" | "cart" | "checkout" | "blog";
  cta?: { label: string; location: string };
};

export default function Header({ active = "home", cta }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  const links = [
    { href: "/", text: "Strona główna" },
    { href: "/#jak-to-dziala", text: "Jak to działa" },
    { href: "/#wiek", text: "Poziom trudności" },
    { href: "/blog", text: "Dla rodziców" },
    { href: "/sklep", text: "Sklep" },
    { href: "mailto:pomoc@malydetektyw.pl", text: "Kontakt" },
  ];
  return (
    <header className="site-header" onKeyDown={event => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }}>
      <a href="#main-content" className="skip-link">Przejdź do treści</a>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Akademia Małego Detektywa - strona główna">
          <Image src="/iwo-logo.png" alt="" width={48} height={48} sizes="48px" />
          <span><small>Akademia</small><strong>Małego Detektywa</strong></span>
        </Link>
        <nav className="desktop-nav" aria-label="Nawigacja główna">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={path === link.href ? "page" : undefined}>{link.text}</Link>)}
        </nav>
        {cta && <AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel={cta.label} analyticsLocation={cta.location} className="header-cta">
          Darmowa zagadka <ArrowUpRight size={17} aria-hidden="true" />
        </AnalyticsLink>}
        <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? "Zamknij menu" : "Otwórz menu"} title={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Nawigacja mobilna">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={path === link.href ? "page" : undefined}>{link.text}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}
      </nav>
    </header>
  );
}
