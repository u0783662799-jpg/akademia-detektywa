import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnalyticsLink from "@/components/AnalyticsLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Blog o zagadkach i zabawie dla dzieci",
  description:
    "Porady dla rodziców: zagadki logiczne, zabawa bez ekranu, śledztwa dla dzieci. Sprawdzone pomysły na aktywny czas z dziećmi 8-12 lat.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog - Akademia Małego Detektywa",
    description: "Pomysły na zabawę, zagadki i śledztwa dla dzieci 8-12 lat.",
    url: `${SITE_URL}/blog`,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Blog o zagadkach i zabawie dla dzieci",
    description: "Pomysły na zabawę, zagadki i śledztwa dla dzieci 8-12 lat.",
    images: [SOCIAL_IMAGE.url],
  },
};


export default function BlogPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <Header active="blog" cta={{ label: "blog_header_pdf", location: "blog_header" }} />
      <main id="main-content">
        <header className="wrap editorial-heading"><p className="section-label">Dla ciekawych dzieci i ich rodziców</p><h1>Notatnik <em>rodzica.</em></h1><p>Pomysły na zagadki, zabawę bez ekranu i takie popołudnia, które chce się powtórzyć.</p></header>
        <section className="wrap journal" aria-label="Artykuły dla rodziców">
          <article className="journal-feature">
            <Link href={`/blog/${featured.slug}`} className={`journal-image${featured.image ? " journal-image-photo" : ""}`} aria-label={featured.title}><Image src={featured.image?.src ?? "/puzzle-suspects.webp"} alt={featured.image?.alt ?? "Podejrzani i wskazówki z darmowej sprawy PDF Akademii"} width={featured.image?.width ?? 708} height={featured.image?.height ?? 1000} priority sizes="(max-width: 700px) 90vw, 430px" /></Link>
            <div><p className="section-label">{featured.category} · {featured.readTime} czytania</p><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.desc}</p><time dateTime={featured.date}>{new Date(featured.date).toLocaleDateString("pl-PL",{ day:"numeric",month:"long",year:"numeric" })}</time><Link href={`/blog/${featured.slug}`} className="text-link">Przeczytaj artykuł <ArrowRight size={18} aria-hidden="true" /></Link></div>
          </article>
          <div className="journal-list">
            {rest.map((article,i)=><article className={article.image ? "journal-with-photo" : undefined} key={article.slug}>{article.image ? <Link href={`/blog/${article.slug}`} className="journal-thumbnail" aria-label={article.title}><Image {...article.image} sizes="(max-width: 700px) 90vw, 200px" /></Link> : <span className="journal-number">0{i+2}</span>}<div><p className="section-label">{article.category} · {article.readTime}</p><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.desc}</p><time dateTime={article.date}>{new Date(article.date).toLocaleDateString("pl-PL",{ day:"numeric",month:"long",year:"numeric" })}</time></div><Link href={`/blog/${article.slug}`} className="read-arrow" aria-label={`Czytaj: ${article.title}`}><ArrowRight size={24} /></Link></article>)}
          </div>
        </section>
        <section className="free-invitation"><div className="wrap"><p className="section-label">Od czytania do działania</p><h2>A może dziś<br /><em>małe śledztwo?</em></h2><p>Zacznijcie od „Sprawy Zaginionego Klejnotu”. Darmowe materiały, wspólne tropy i tajemnica do rozwiązania.</p><AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel="blog_bottom_pdf" analyticsLocation="blog_bottom" className="action action-light">Pobierz darmową zagadkę PDF <ArrowRight size={19} aria-hidden="true" /></AnalyticsLink></div></section>
      </main>
      <Footer />
    </>
  );
}
