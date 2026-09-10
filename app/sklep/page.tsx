import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnalyticsLink from "@/components/AnalyticsLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DEFAULT_META, SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sklep",
  description:
    "Poznaj sklep Akademii Małego Detektywa. Papierowe teczki ze śledztwem, zestawy premium i darmowa sprawa PDF dla dzieci 8-12 lat.",
  alternates: {
    canonical: `${SITE_URL}/sklep`,
  },
  openGraph: {
    title: "Sklep | Akademia Małego Detektywa",
    description:
      "Pierwsze teczki detektywistyczne dla dzieci już wkrótce. Poznaj świat Detektywa IWO i odbierz darmową sprawę PDF.",
    url: `${SITE_URL}/sklep`,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Sklep | Akademia Małego Detektywa",
    description:
      "Teczki ze śledztwem, zestawy premium i darmowa sprawa PDF dla dzieci 8-12 lat.",
    images: [DEFAULT_META.ogImage],
  },
};

export default function ShopPage() {
  return (
    <>
      <Header active="shop" />
      <main id="main-content">
        <header className="wrap editorial-heading"><p className="section-label">Sklep Akademii · w przygotowaniu</p><h1>Nowe sprawy.<br /><em>Już wkrótce.</em></h1><p>Pracujemy nad fizycznymi teczkami detektywa. Jeszcze nie przyjmujemy zamówień. Tymczasem możecie rozpocząć pierwsze śledztwo za darmo.</p></header>
        <section className="shop-first-case wrap section-space">
          <figure><Image src="/iwo-pdf-cover.webp" alt="Dostępna teraz darmowa zagadka PDF: Sprawa Zaginionego Klejnotu" width={990} height={1400} priority sizes="(max-width:700px) 260px, 330px" /><figcaption>Dostępna teraz · do samodzielnego wydruku</figcaption></figure>
          <div><p className="section-label">Nie trzeba czekać na przygodę</p><h2>Sprawa Zaginionego<br /><em>Klejnotu.</em></h2><p>Papierowa tajemnica dla dzieci 8-10 lat. W środku mapa, tropy i podejrzani. Wszystko do wydrukowania w domu.</p><dl className="case-facts"><div><dt>Format</dt><dd>PDF do druku</dd></div><div><dt>Czas zabawy</dt><dd>45-90 minut</dd></div><div><dt>Na początek</dt><dd>Bezpłatnie po zapisie e-mail</dd></div></dl><AnalyticsLink href="/#darmowy-pdf" analyticsCategory="lead" analyticsLabel="shop_free_pdf" analyticsLocation="shop_coming_soon" className="action">Odbierz darmową sprawę <ArrowRight size={19} aria-hidden="true" /></AnalyticsLink></div>
        </section>
        <section className="coming-band"><div className="wrap coming-inner"><div><p className="section-label">W przygotowaniu</p><h2>Od pliku PDF<br /><em>do własnej teczki.</em></h2></div><p>Planujemy fizyczne zestawy pełne zagadek, tropów i akcesoriów śledczych. Szczegóły pokażemy, gdy będą gotowe. Nie musisz teraz nic zamawiać.</p></div></section>
      </main>
      <Footer />
    </>
  );
}
