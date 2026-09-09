import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import AnalyticsLink from "@/components/AnalyticsLink";
import { DEFAULT_META, SITE_URL, schemaFAQHome } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Zagadki detektywistyczne dla dzieci 8-12 lat | FOX",
  description: DEFAULT_META.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Zagadki detektywistyczne dla dzieci 8-12 lat | FOX",
    description: DEFAULT_META.description,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_META.ogImage,
        width: 1200,
        height: 630,
        alt: "Akademia Małego Detektywa - zagadki detektywistyczne dla dzieci 8-12 lat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zagadki detektywistyczne dla dzieci 8-12 lat | FOX",
    description: DEFAULT_META.description,
    images: [DEFAULT_META.ogImage],
  },
};

const ages = [
  {
    label: "Start",
    age: "8 lat",
    name: "Mały Detektyw FOX",
    desc: "Pierwsze śledztwa, proste tropy i dużo wsparcia na start.",
    level: "łatwy",
    img: "/lis1.png",
    alt: "Postać lisa detektywa dla dzieci 8 lat - poziom łatwy, Mały Detektyw FOX",
  },
  {
    label: "Przygoda",
    age: "9-10 lat",
    name: "Detektyw FOX",
    desc: "Więcej szyfrów, trudniejsze wskazówki i ciekawsze sprawy.",
    level: "średni",
    img: "/lis2.png",
    alt: "Postać lisa detektywa dla dzieci 9-10 lat - poziom średni, Detektyw FOX",
  },
  {
    label: "Wyzwanie",
    age: "11-12 lat",
    name: "Starszy FOX",
    desc: "Najbardziej wymagające zagadki dla doświadczonych detektywów.",
    level: "trudny",
    img: "/lis3.png",
    alt: "Postać lisa detektywa dla dzieci 11-12 lat - poziom trudny, Starszy FOX",
  },
];

const features = [
  { icon: "🧠", title: "Rozwija logikę", desc: "i sposób myślenia" },
  { icon: "🏠", title: "Zabawa w domu", desc: "gotowa od razu" },
  { icon: "👦", title: "Dla dzieci", desc: "8-12 lat" },
  { icon: "📵", title: "Bez ekranu", desc: "edukacyjnie" },
];

const faqVisible = [
  {
    q: "Dla jakiego wieku są zagadki?",
    a: "Dla dzieci 8-12 lat, podzielone na trzy poziomy: łatwy (8 lat), średni (9-10 lat) i trudny (11-12 lat).",
  },
  {
    q: "Czy dziecko może grać samo?",
    a: "Tak. Starsze dzieci 10-12 lat zazwyczaj dają radę solo. Młodszym może towarzyszyć rodzic jako partner w śledztwie.",
  },
  {
    q: "Co jest w zestawie premium?",
    a: "Teczka z zagadką, latarka UV, notatnik detektywa i akcesoria śledcze.",
  },
  {
    q: "Czy to zabawa bez ekranu?",
    a: "Tak. Dziecko pracuje wyłącznie z papierowymi materiałami, szyframi i wskazówkami.",
  },
  {
    q: "Czy trzeba drukować?",
    a: "Wersja PDF wymaga wydruku. Wydanie premium jest gotowe do zabawy od razu po rozpakowaniu.",
  },
  {
    q: "Ile trwa jedna sprawa?",
    a: "Od 45 do 90 minut, w zależności od wieku dziecka i poziomu trudności.",
  },
  {
    q: "Czy będą nowe sprawy?",
    a: "Tak. Zapisz się do klubu detektywa, żeby jako pierwszy dowiedzieć się o nowościach.",
  },
];

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQHome) }}
      />

      <header className="sticky top-0 z-50 bg-navy shadow-md">
        <nav
          className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:h-16 md:flex-nowrap md:py-0"
          aria-label="Nawigacja główna"
        >
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo Akademii Małego Detektywa - lis detektyw"
              width={40}
              height={40}
              priority
            />
            <span className="font-display text-base leading-tight text-cream sm:text-lg">
              <span className="text-gold">Akademia</span>
              <br className="hidden sm:block" /> Małego Detektywa
            </span>
          </Link>

          <ul className="hidden items-center gap-6 text-sm font-medium text-cream/80 md:flex">
            <li>
              <Link href="/#wiek" className="transition-colors hover:text-gold">
                Wiek
              </Link>
            </li>
            <li>
              <Link href="/#nowosci" className="transition-colors hover:text-gold">
                Nowości
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-gold">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/sklep" className="transition-colors hover:text-gold">
                Sklep
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="transition-colors hover:text-gold">
                Kontakt
              </Link>
            </li>
          </ul>

          <AnalyticsLink
            href="/darmowa-zagadka"
            className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-orange sm:px-5"
            analyticsCategory="lead"
            analyticsLabel="header_darmowy_pdf"
            analyticsLocation="header"
          >
            Darmowy PDF
          </AnalyticsLink>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-navy text-cream">
          <div
            className="absolute inset-0 bg-[url('/detektyw.png')] bg-cover bg-[72%_center] bg-no-repeat md:bg-[right_center] md:bg-contain"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,25,40,0.72)_0%,rgba(6,25,40,0.84)_18%,rgba(6,25,40,0.92)_100%)] md:bg-[linear-gradient(90deg,#061928_0%,#061928_45%,rgba(6,25,40,0.78)_68%,rgba(6,25,40,0.16)_100%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-start px-4 pb-14 pt-16 sm:min-h-[82svh] sm:justify-center sm:pt-24 md:pb-24 md:pt-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Nowa seria spraw dla dzieci 8-12 lat
            </p>

            <h1 className="mb-6 max-w-xl font-display text-4xl leading-[0.98] text-cream sm:text-5xl md:text-7xl">
              Zagadki detektywistyczne dla dzieci 8-12 lat.{" "}
              <span className="text-gold">Rozwiązuj sprawy z FOX-em!</span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg md:mb-10">
              Gotowe papierowe teczki ze śledztwem, szyframi i wskazówkami.
              Każda sprawa zamienia pokój dziecka w małe biuro detektywa i daje
              świetną zabawę bez ekranu.
            </p>

            <div className="flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4">
              <AnalyticsLink
                href="/darmowa-zagadka"
                className="rounded-full bg-gold px-6 py-3.5 text-center text-base font-bold text-navy shadow-soft transition-colors hover:bg-orange sm:px-8 sm:py-4 sm:text-lg"
                analyticsCategory="lead"
                analyticsLabel="hero_pobierz_pdf"
                analyticsLocation="home_hero"
              >
                Pobierz darmową zagadkę PDF
              </AnalyticsLink>
              <Link
                href="/sklep"
                className="rounded-full border border-cream/40 px-6 py-3.5 text-center text-base font-semibold text-cream transition-colors hover:border-gold hover:text-gold sm:px-8 sm:py-4 sm:text-lg"
              >
                Zobacz sklep
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-paper px-4 py-10 sm:py-12" aria-label="Zalety zagadek detektywistycznych">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-cream/70 p-4 text-center shadow-[0_10px_25px_rgba(6,25,40,0.06)]"
              >
                <div className="mb-2 text-3xl sm:text-4xl">{feature.icon}</div>
                <h2 className="font-display text-base text-navy sm:text-lg">
                  {feature.title}
                </h2>
                <p className="text-sm text-navy/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-cream px-4 py-16" id="darmowy-pdf">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
                Darmowy start
              </p>
              <h2 className="mb-4 font-display text-3xl text-navy md:text-4xl">
                Pobierz pierwszą sprawę PDF
              </h2>
              <p className="mb-6 leading-relaxed text-navy/70">
                Jedna kompletna mini teczka z zagadką, tropami i zadaniem
                finałowym. Idealna, żeby sprawdzić, czy Twoje dziecko pokocha
                świat śledztw FOX-a.
              </p>
              <AnalyticsLink
                href="/darmowa-zagadka"
                className="inline-block rounded-full bg-gold px-8 py-4 text-lg font-bold text-navy shadow-soft transition-colors hover:bg-orange"
                analyticsCategory="lead"
                analyticsLabel="home_pdf_section"
                analyticsLocation="home_pdf_section"
              >
                Pobierz darmową zagadkę →
              </AnalyticsLink>
            </div>

            <div className="flex justify-center">
              <Image
                src="/pdf-cover.png"
                alt="Okładka darmowej zagadki detektywistycznej PDF - Sprawa Zaginionego Klejnotu dla dzieci"
                width={320}
                height={420}
                className="h-auto w-full max-w-[280px] rounded-2xl shadow-soft sm:max-w-[320px]"
              />
            </div>
          </div>
        </section>

        <section
          className="bg-navy px-4 py-16"
          id="wiek"
          aria-label="Poziomy zagadek według wieku dziecka"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
                Wybierz poziom
              </p>
              <h2 className="font-display text-3xl text-cream md:text-4xl">
                Zagadki dopasowane do wieku
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {ages.map((age) => (
                <article
                  key={age.name}
                  className="rounded-3xl border border-white/10 bg-ink p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 sm:p-8"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-gold/70">
                    {age.label}
                  </span>

                  <div className="mb-5 mt-1 font-display text-2xl text-gold">
                    {age.age}
                  </div>

                  <div className="mb-5 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 scale-110 rounded-full bg-gold/20 opacity-70 blur-2xl" />
                      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gold/20 bg-[#10243a] shadow-2xl sm:h-44 sm:w-44">
                        <Image
                          src={age.img}
                          alt={age.alt}
                          fill
                          className="object-cover scale-125"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-2 font-display text-xl text-cream">
                    {age.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-cream/60">
                    {age.desc}
                  </p>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
                    Poziom: {age.level}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper px-4 py-16" id="nowosci">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
                Pierwsze wydanie premium
              </p>
              <h2 className="mb-6 font-display text-3xl text-navy md:text-4xl">
                Zamów sprawę nr 1 i zgarnij gadżety detektywa
              </h2>
              <ul className="mb-8 space-y-3">
                {[
                  "Teczka z zagadką",
                  "Latarka UV",
                  "Notatnik detektywa",
                  "Akcesoria śledcze",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-navy">
                    <span className="font-bold text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sklep"
                className="inline-block rounded-full bg-navy px-8 py-4 text-lg font-bold text-cream shadow-soft transition-colors hover:bg-ink"
              >
                Zobacz w sklepie →
              </Link>
            </div>

            <div className="flex justify-center">
              <Image
                src="/okladka1.png"
                alt="Okładka pierwszego wydania premium Akademii Małego Detektywa z latarką UV i akcesoriami śledczymi"
                width={340}
                height={420}
                className="h-auto w-full max-w-[300px] rounded-2xl shadow-soft sm:max-w-[340px]"
              />
            </div>
          </div>
        </section>

        <section
          className="bg-cream px-4 py-16"
          id="faq"
          aria-label="Najczęstsze pytania o zagadki detektywistyczne"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
                FAQ
              </p>
              <h2 className="font-display text-3xl text-navy md:text-4xl">
                Pytania, które rodzice zadają najczęściej
              </h2>
            </div>

            <div className="space-y-4">
              {faqVisible.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-navy/10 bg-paper p-5 sm:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                    {item.q}
                    <span className="text-xl text-gold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-navy/70">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-navy px-4 py-16"
          id="kontakt"
          aria-label="Dołącz do Akademii Małego Detektywa"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Klub detektywa
            </p>
            <h2 className="mb-4 font-display text-3xl text-cream md:text-4xl">
              Bądź na bieżąco
            </h2>
            <p className="mb-8 text-cream/70">
              Nowe sprawy, kody rabatowe i darmowe PDF-y prosto na Twoją
              skrzynkę.
            </p>
            <AnalyticsLink
              href="/darmowa-zagadka"
              className="inline-block rounded-full bg-gold px-8 py-4 text-lg font-bold text-navy shadow-soft transition-colors hover:bg-orange sm:px-10"
              analyticsCategory="lead"
              analyticsLabel="home_newsletter_cta"
              analyticsLocation="home_newsletter"
            >
              Odbierz darmową sprawę PDF
            </AnalyticsLink>
            <p className="mt-4 text-xs leading-relaxed text-cream/50">
              Zapisując się, akceptujesz{" "}
              <Link
                href="/polityka-prywatnosci"
                className="underline underline-offset-2 transition-colors hover:text-gold"
              >
                politykę prywatności
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-4 py-10 text-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm md:flex-row">
          <p>© 2026 Akademia Małego Detektywa. Wszystkie prawa zastrzeżone.</p>
          <nav aria-label="Linki w stopce">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Strona główna
                </Link>
              </li>
              <li>
                <AnalyticsLink
                  href="/darmowa-zagadka"
                  className="transition-colors hover:text-gold"
                  analyticsCategory="lead"
                  analyticsLabel="home_footer_pdf"
                  analyticsLocation="home_footer"
                >
                  Darmowy PDF
                </AnalyticsLink>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-gold">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sklep" className="transition-colors hover:text-gold">
                  Sklep
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="transition-colors hover:text-gold">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="transition-colors hover:text-gold"
                >
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
