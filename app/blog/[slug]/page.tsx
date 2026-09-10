import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsLink from "@/components/AnalyticsLink";
import { notFound } from "next/navigation";
import { articles } from "../articles";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import DevelopmentArticle from "../development-article";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.desc,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.desc,
      type: "article",
      url: `${SITE_URL}/blog/${article.slug}`,
      publishedTime: article.date,
      images: [article.image ? { url: `${SITE_URL}${article.image.src}`, width: article.image.width, height: article.image.height, alt: article.image.alt } : SOCIAL_IMAGE],
    },
    twitter: { card: article.image ? "summary_large_image" : "summary", title: article.title, description: article.desc, images: [article.image ? `${SITE_URL}${article.image.src}` : SOCIAL_IMAGE.url] },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc,
    datePublished: article.date,
    ...(article.image && { image: `${SITE_URL}${article.image.src}` }),
    author: { "@type": "Organization", name: "Akademia Małego Detektywa" },
    publisher: {
      "@type": "Organization",
      name: "Akademia Małego Detektywa",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/iwo-logo.png` },
    },
    url: `${SITE_URL}/blog/${article.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />

      <Header active="blog" cta={{ label: "article_header_pdf", location: "article_header" }} />

      <main id="main-content" className="article-page wrap">
        <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-6">
          <Link href="/" className="hover:text-navy">Strona główna</Link>
          {" / "}
          <Link href="/blog" className="hover:text-navy">Blog</Link>
          {" / "}
          <span className="text-navy">{article.category}</span>
        </nav>

        <header className="article-heading">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">{article.category}</span>
            <span className="text-navy/30 text-xs ml-3">{article.readTime} czytania</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-4">{article.title}</h1>
          <p className="text-navy/60 text-lg mb-6 leading-relaxed">{article.desc}</p>
          <time dateTime={article.date} className="text-navy/40 text-sm">
            {new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </header>

        {article.image ? <figure className="article-photo article-photo-hero"><Image {...article.image} priority sizes="(max-width: 900px) 90vw, 900px" /></figure> : <figure className="article-material"><Image src="/iwo-puzzle-map.webp" alt="Mapa zamku z darmowej Sprawy Zaginionego Klejnotu" width={990} height={1400} sizes="(max-width: 700px) 85vw, 380px" /><figcaption>Od pomysłu do wspólnej zabawy.<br /><em>Fragment naszej darmowej sprawy PDF.</em></figcaption></figure>}

        <div className="article-body prose prose-navy max-w-none prose-headings:font-display prose-p:text-navy/80 prose-li:text-navy/80">

  {article.slug === "gry-logiczne-zagadki-detektywistyczne-rozwoj-dziecka" && <DevelopmentArticle />}

  {article.content?.map((block, index) => block.type === "heading"
    ? <h2 key={index}>{block.text}</h2>
    : <p key={index}>{block.text}</p>)}
</div>

        <section className="article-cta">
          <p className="section-label">Zróbcie pierwszy krok</p>
          <h2>Teraz czas na Waszą sprawę.</h2>
          <p>Poznajcie świat Detektywa IWO. Zacznijcie od darmowej zagadki PDF, w której dziecko samodzielnie łączy tropy i odkrywa rozwiązanie.</p>
          <AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel="article_bottom_pdf" analyticsLocation="article_bottom" className="action">
            Pobierz za darmo <ArrowRight size={19} aria-hidden="true" />
          </AnalyticsLink>
        </section>

        <section className="related-reading"><p className="section-label">Jeszcze jeden pomysł na wspólny czas</p>{articles.filter(a=>a.slug!==article.slug).slice(0,2).map(a=><Link key={a.slug} href={`/blog/${a.slug}`}>{a.title}<ArrowRight size={20} aria-hidden="true" /></Link>)}</section>

        <div className="mt-10">
          <Link href="/blog" className="text-orange font-semibold hover:underline">← Wróć do bloga</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
