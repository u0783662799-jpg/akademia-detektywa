import Link from "next/link";

const links = [
  { label: "Strona główna", href: "/" },
  { label: "Wiek", href: "/#wiek" },
  { label: "Nowości", href: "/#nowosci" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kontakt", href: "/kontakt" }
];

export default function Footer() {
  return (
    <footer className="bg-[#04111d] py-10 text-white/75">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Akademia Małego Detektywa. Wszystkie prawa zastrzeżone.</p>
        <nav className="flex flex-wrap gap-4 text-sm font-bold uppercase">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}