import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsLink from "@/components/AnalyticsLink";
import { SITE_URL } from "@/lib/seo";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Blog o zagadkach i zabawie dla dzieci | Akademia Małego Detektywa",
  description:
    "Porady dla rodziców: zagadki logiczne, zabawa bez ekranu, śledztwa dla dzieci. Sprawdzone pomysły na aktywny czas z dziećmi 8–12 lat.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog – Akademia Małego Detektywa",
    description: "Pomysły na zabawę, zagadki i śledztwa dla dzieci 8–12 lat.",
    url: `${SITE_URL}/blog`,
  },
};

const categoryColors: Record<string, string> = {
  "Zagadki": "bg-blue-100 text-blue-800",
  "Inspiracje": "bg-purple-100 text-purple-800",
  "Poradniki": "bg-orange-100 text-orange-800",
  "Rankingi": "bg-yellow-100 text-yellow-800",
  "Rozwój": "bg-green-100 text-green-800",
  "DIY": "bg-pink-100 text-pink-800",
  "Urodziny": "bg-red-100 text-red-800",
  "Darmowe materiały": "bg-teal-100 text-teal-800",
};

export default function BlogPage() {
  return (
    <>
      <header className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-cream text-base">
            <span className="text-gold">Akademia</span> Małego Detektywa
          </Link>
          <AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel="blog_header_pdf" analyticsLocation="blog_header" className="bg-gold text-navy text-sm font-bold px-4 py-2 rounded-full">
            Darmowy PDF
          </AnalyticsLink>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-orange text-xs font-bold uppercase tracking-widest mb-2">Blog</p>
          <h1 className="font-display text-4xl md:text-5xl text-navy mb-4">
            Zagadki, zabawa i śledztwa dla dzieci
          </h1>
          <p className="text-navy/60 text-lg max-w-xl mx-auto">
            Porady dla rodziców — jak bawić się z dziećmi bez ekranu, rozwijać myślenie i organizować detektywistyczne przygody.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-paper rounded-2xl overflow-hidden border border-navy/10 hover:border-gold/40 hover:shadow-soft transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[article.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {article.category}
                  </span>
                  <span className="text-navy/30 text-xs">{article.readTime}</span>
                </div>
                <h2 className="font-display text-lg text-navy mb-2 group-hover:text-orange transition-colors leading-snug">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="text-navy/60 text-sm leading-relaxed mb-4">{article.desc}</p>
                <div className="flex items-center justify-between">
                  <time className="text-navy/30 text-xs" dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-orange text-sm font-semibold hover:underline"
                    aria-label={`Czytaj: ${article.title}`}
                  >
                    Czytaj →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16 bg-navy rounded-3xl p-12">
          <h2 className="font-display text-3xl text-cream mb-4">Zacznij od darmowej zagadki</h2>
          <p className="text-cream/70 mb-6">Pobierz pierwszą sprawę PDF i sprawdź, jak działa Akademia Małego Detektywa.</p>
          <AnalyticsLink href="/darmowa-zagadka" analyticsCategory="lead" analyticsLabel="blog_bottom_pdf" analyticsLocation="blog_bottom" className="inline-block bg-gold text-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-orange transition-colors">
            Pobierz darmową zagadkę PDF →
          </AnalyticsLink>
        </div>
      </main>

      <footer className="bg-ink text-cream/50 py-8 px-4 text-sm text-center mt-16">
        <p>© 2026 Akademia Małego Detektywa. <Link href="/polityka-prywatnosci" className="underline hover:text-cream/70">Polityka prywatności</Link></p>
      </footer>
    </>
  );
}
