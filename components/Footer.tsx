import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnalyticsLink from "./AnalyticsLink";
import CookieSettingsButton from "./CookieSettingsButton";

export default function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div><p className="section-label">Akademia Małego Detektywa</p><p className="footer-motto">Małe tropy.<br />Wielka przygoda.</p></div>
        <nav aria-label="Linki w stopce">
          <Link href="/">Strona główna</Link>
          <Link href="/blog">Dla rodziców</Link>
          <Link href="/sklep">Sklep</Link>
          <a href="mailto:pomoc@malydetektyw.pl">Kontakt</a>
          {home && <AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel="home_footer_pdf" analyticsLocation="home_footer">Darmowy PDF <ArrowUpRight size={16} aria-hidden="true" /></AnalyticsLink>}
        </nav>
        <p className="footer-note">Papierowe śledztwa dla dzieci<br />i wspólny czas dla całej rodziny.</p>
      </div>
      <div className="wrap footer-bottom"><p>© 2026 Akademia Małego Detektywa</p><Link href="/polityka-prywatnosci">Polityka prywatności</Link><CookieSettingsButton /></div>
    </footer>
  );
}
