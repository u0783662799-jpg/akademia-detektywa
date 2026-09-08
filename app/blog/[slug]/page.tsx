import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../articles";
import { SITE_URL } from "@/lib/seo";

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
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.desc },
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
    author: { "@type": "Organization", name: "Akademia Małego Detektywa" },
    publisher: {
      "@type": "Organization",
      name: "Akademia Małego Detektywa",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    url: `${SITE_URL}/blog/${article.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />

      <header className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-cream text-base">
            <span className="text-gold">Akademia</span> Małego Detektywa
          </Link>
          <Link href="/darmowa-zagadka" className="bg-gold text-navy text-sm font-bold px-4 py-2 rounded-full">
            Darmowy PDF
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-6">
          <Link href="/" className="hover:text-navy">Strona główna</Link>
          {" / "}
          <Link href="/blog" className="hover:text-navy">Blog</Link>
          {" / "}
          <span className="text-navy">{article.category}</span>
        </nav>

        <header>
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

        <hr className="border-navy/10 my-8" />

        <div className="prose prose-navy max-w-none prose-headings:font-display prose-p:text-navy/80 prose-li:text-navy/80">

  {article.slug === "zagadki-logiczne-dla-dzieci-8-lat" && (
    <>
      <p>
        Zagadki logiczne dla dzieci 8 lat to świetny sposób na rozwijanie koncentracji,
        cierpliwości i umiejętności analitycznego myślenia. Dzieci w tym wieku uwielbiają
        rozwiązywać tajemnice, odkrywać ukryte wskazówki i wcielać się w rolę małych detektywów.
      </p>

      <h2>Dlaczego warto rozwiązywać zagadki logiczne?</h2>

      <p>
        Regularne rozwiązywanie zagadek wspiera rozwój mózgu dziecka i poprawia pamięć.
        To również doskonała alternatywa dla telefonu, tabletu i telewizora.
      </p>

      <p>
        Dziecko uczy się analizowania informacji, szukania zależności oraz wyciągania wniosków.
        Takie umiejętności przydają się później zarówno w szkole, jak i w codziennym życiu.
      </p>

      <h2>10 prostych zagadek logicznych dla dzieci 8 lat</h2>

      <ul>
        <li>Co ma klucze, ale nie otwiera drzwi? — Pianino.</li>
        <li>Im więcej zabierasz, tym większe się staje? — Dziura.</li>
        <li>Co można złamać, choć tego nie dotkniesz? — Obietnicę.</li>
        <li>Co ma ręce, ale nie klaszcze? — Zegar.</li>
        <li>Co rośnie, gdy pada deszcz? — Kałuża.</li>
      </ul>

      <h2>Jak zachęcić dziecko do rozwiązywania zagadek?</h2>

      <p>
        Najlepiej działa zabawa i klimat tajemnicy. Dzieci dużo chętniej rozwiązują zagadki,
        gdy czują się jak prawdziwi detektywi.
      </p>

      <p>
        Możesz przygotować tropy w domu, ukryć wiadomości albo wydrukować gotowe śledztwo PDF.
      </p>

      <h2>Zagadki detektywistyczne dla dzieci</h2>

      <p>
        Jeśli Twoje dziecko lubi zagadki logiczne, świetnym kolejnym krokiem będą
        papierowe sprawy detektywistyczne Akademii Małego Detektywa.
      </p>

      <p>
        Każda sprawa zawiera szyfry, wskazówki, tropy i finałowe rozwiązanie zagadki.
      </p>

      <h2>FAQ — zagadki logiczne dla dzieci</h2>

      <h3>Od jakiego wieku dziecko może rozwiązywać zagadki?</h3>

      <p>
        Najprostsze zagadki logiczne można wprowadzać już od 6–7 roku życia.
        Dla dzieci 8-letnich idealne są krótkie zagadki z elementem dedukcji.
      </p>

      <h3>Czy zagadki rozwijają inteligencję dziecka?</h3>

      <p>
        Tak. Rozwijają logiczne myślenie, pamięć, koncentrację i kreatywność.
      </p>
    </>
  )}

  {article.slug === "zabawa-bez-ekranu-dla-dzieci" && (
    <>
      <p>
        Coraz więcej rodziców szuka sposobów na zabawę bez ekranu dla dzieci.
        Nadmiar telefonu, tabletu i telewizji sprawia, że dzieci szybciej się rozpraszają
        i mają problemy z koncentracją.
      </p>

      <h2>Dlaczego warto ograniczać ekran?</h2>

      <p>
        Zabawa offline rozwija wyobraźnię, kreatywność i relacje rodzinne.
        Dziecko aktywnie uczestniczy w zabawie zamiast biernie konsumować treści.
      </p>

      <h2>15 pomysłów na zabawę bez ekranu</h2>

      <ul>
        <li>domowe śledztwo detektywistyczne,</li>
        <li>budowanie bazy,</li>
        <li>ukrywanie skarbów,</li>
        <li>zagadki logiczne,</li>
        <li>szyfrowanie wiadomości,</li>
        <li>tworzenie mapy skarbów,</li>
        <li>domowy escape room,</li>
        <li>gra w poszukiwaczy tropów.</li>
      </ul>

      <h2>Jak oderwać dziecko od tabletu?</h2>

      <p>
        Najlepiej nie zabierać ekranu „na siłę”, ale zaproponować coś ciekawszego.
        Dzieci uwielbiają wyzwania, tajemnice i zadania angażujące emocje.
      </p>

      <p>
        Świetnie działają gry detektywistyczne i papierowe śledztwa z fabułą.
      </p>

      <h2>Detektywistyczna zabawa w domu</h2>

      <p>
        Możesz zamienić mieszkanie w biuro śledcze:
        ukryć wskazówki, przygotować tajne wiadomości i stworzyć prostą zagadkę kryminalną.
      </p>

      <p>
        To jedna z najbardziej angażujących zabaw bez ekranu dla dzieci 8–12 lat.
      </p>

      <h2>FAQ — zabawa bez ekranu</h2>

      <h3>Ile czasu dziecko powinno spędzać przed ekranem?</h3>

      <p>
        Warto dbać o równowagę i codziennie zapewniać aktywności offline.
      </p>

      <h3>Jakie zabawy najbardziej angażują dzieci?</h3>

      <p>
        Najbardziej angażują gry z fabułą, tajemnicą i elementem przygody.
      </p>
    </>
  )}

  {article.slug === "prezent-dla-dziecka-10-lat" && (
    <>
      <p>
        Wybór prezentu dla dziecka 10 lat często nie jest łatwy.
        Wielu rodziców chce kupić coś więcej niż kolejną plastikową zabawkę.
      </p>

      <h2>Jaki prezent dla 10-latka sprawdzi się najlepiej?</h2>

      <p>
        Najlepsze prezenty rozwijają kreatywność, logiczne myślenie
        i pozwalają dziecku aktywnie uczestniczyć w zabawie.
      </p>

      <h2>Pomysły na prezent dla dziecka 10 lat</h2>

      <ul>
        <li>gry detektywistyczne,</li>
        <li>zagadki logiczne,</li>
        <li>escape roomy dla dzieci,</li>
        <li>zestawy kreatywne DIY,</li>
        <li>gry planszowe kooperacyjne,</li>
        <li>papierowe śledztwa detektywistyczne.</li>
      </ul>

      <h2>Dlaczego dzieci kochają zagadki detektywistyczne?</h2>

      <p>
        Dziecko czuje emocje podobne do prawdziwego śledztwa:
        analizuje tropy, odkrywa wskazówki i rozwiązuje tajemnicę krok po kroku.
      </p>

      <p>
        Dzięki temu zabawa jest dużo bardziej angażująca niż zwykły ekran.
      </p>

      <h2>Prezent bez ekranu</h2>

      <p>
        Coraz więcej rodziców szuka prezentów offline.
        Zabawa bez telefonu wspiera koncentrację i kreatywność dziecka.
      </p>

      <h2>Pomysł na wyjątkowy prezent</h2>

      <p>
        Akademia Małego Detektywa tworzy gotowe papierowe śledztwa dla dzieci 8–12 lat.
        Dziecko otrzymuje tropy, szyfry i pełną historię do rozwiązania.
      </p>

      <h2>FAQ — prezent dla dziecka 10 lat</h2>

      <h3>Co kupić dziecku zamiast kolejnej zabawki?</h3>

      <p>
        Najlepiej sprawdzają się prezenty angażujące emocje i rozwijające kreatywność.
      </p>

      <h3>Jakie prezenty rozwijają logiczne myślenie?</h3>

      <p>
        Zagadki, gry detektywistyczne i escape roomy świetnie ćwiczą analizowanie informacji.
      </p>
    </>
  )}

  {article.slug === "jak-oderwac-dziecko-od-tabletu" && (
    <>
      <p>
        Wielu rodziców zastanawia się, jak oderwać dziecko od tabletu
        bez codziennych kłótni i frustracji.
      </p>

      <h2>Dlaczego dzieci tak lubią ekran?</h2>

      <p>
        Gry i aplikacje dostarczają szybkich emocji oraz ciągłych bodźców.
        Dlatego zwykłe zabawy często wydają się mniej atrakcyjne.
      </p>

      <h2>8 sposobów na ograniczenie tabletu</h2>

      <ul>
        <li>ustalenie konkretnych godzin ekranowych,</li>
        <li>wspólna zabawa offline,</li>
        <li>domowe śledztwa detektywistyczne,</li>
        <li>gry logiczne,</li>
        <li>zabawy ruchowe,</li>
        <li>budowanie baz,</li>
        <li>wspólne rozwiązywanie zagadek,</li>
        <li>rodzinne escape roomy.</li>
      </ul>

      <h2>Co działa najlepiej?</h2>

      <p>
        Najlepiej działa zastąpienie ekranu czymś bardziej emocjonującym.
        Dzieci kochają wyzwania, tajemnice i przygodę.
      </p>

      <h2>Zabawy detektywistyczne zamiast telefonu</h2>

      <p>
        Gry detektywistyczne angażują dziecko na długo,
        ponieważ wymagają logicznego myślenia i odkrywania tropów.
      </p>

      <p>
        To świetna forma zabawy bez ekranu dla dzieci 8–12 lat.
      </p>

      <h2>FAQ — jak ograniczyć tablet dziecku?</h2>

      <h3>Czy całkowity zakaz ekranu ma sens?</h3>

      <p>
        Zazwyczaj lepiej działa zdrowa równowaga niż całkowity zakaz.
      </p>

      <h3>Jak zachęcić dziecko do zabawy offline?</h3>

      <p>
        Najlepiej proponować aktywności angażujące emocje i ciekawość dziecka.
      </p>
    </>
  )}

</div>

        <div className="mt-16 bg-navy rounded-3xl p-10 text-center">
          <p className="font-display text-2xl text-cream mb-3">Gotowy na pierwsze śledztwo?</p>
          <p className="text-cream/70 mb-6">Pobierz darmową zagadkę PDF i sprawdź, czy Twoje dziecko zostanie Detektywem FOX-a.</p>
          <Link href="/darmowa-zagadka" className="inline-block bg-gold text-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-orange transition-colors">
            Pobierz za darmo →
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-orange font-semibold hover:underline">← Wróć do bloga</Link>
        </div>
      </main>

      <footer className="bg-ink text-cream/50 py-8 px-4 text-sm text-center mt-8">
        <p>© 2026 Akademia Małego Detektywa. <Link href="/polityka-prywatnosci" className="underline hover:text-cream/70">Polityka prywatności</Link></p>
      </footer>
    </>
  );
}
