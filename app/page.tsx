import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ArrowDown, Plus } from "lucide-react";
import AnalyticsLink from "@/components/AnalyticsLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DETECTIVE_LEVELS } from "@/lib/character";
import { DEFAULT_META, SITE_URL, SOCIAL_IMAGE, schemaFAQHome } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Zagadki detektywistyczne dla dzieci 8-12 lat | Detektyw IWO",
  description: DEFAULT_META.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Zagadki detektywistyczne dla dzieci 8-12 lat | Detektyw IWO",
    description: DEFAULT_META.description,
    url: SITE_URL,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Zagadki detektywistyczne dla dzieci 8-12 lat | Detektyw IWO",
    description: DEFAULT_META.description,
    images: [DEFAULT_META.ogImage],
  },
};


export default function HomePage() {
  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQHome) }} />
      <Header cta={{ label: "header_darmowy_pdf", location: "header" }} />
      <main id="main-content">
        <section className="adventure-hero">
          <Image src="/iwo-hero.webp" alt="" fill priority sizes="100vw" className="hero-scene" />
          <div className="wrap hero-content">
            <p className="section-label">Papierowe przygody dla dzieci 8-12 lat</p>
            <h1>Akademia <br />Małego<br /><em>Detektywa.</em></h1>
            <p className="hero-deck">Małe tropy. Wielka wyobraźnia.<br />Przygoda, która zbliża.</p>
            <p className="hero-copy">Tu zwykły stół staje się biurem śledczym. Detektyw IWO towarzyszy Wam w przygodzie, a dziecko łączy tropy i odkrywa rozwiązanie.</p>
            <AnalyticsLink href="/darmowa-zagadka" className="action" analyticsCategory="lead" analyticsLabel="hero_pobierz_pdf" analyticsLocation="home_hero">Rozpocznijcie pierwszą sprawę <ArrowRight size={19} aria-hidden="true" /></AnalyticsLink>
            <p className="hero-fine">Na dobry początek: darmowa zagadka do druku.</p>
          </div>
          <a className="hero-scroll" href="#jak-to-dziala" aria-label="Zobacz, jak to działa"><ArrowDown size={18} aria-hidden="true" /></a>
        </section>
        <div className="fact-line"><div className="wrap"><span>Papierowe historie</span><span>Własne pomysły i odkrycia</span><span>Zabawa bez ekranu</span><span>Dziecko + ciekawość + Ty</span></div></div>

        <section className="section-how wrap section-space" id="jak-to-dziala">
          <div className="section-intro"><p className="section-label">Od zwykłego stołu do wielkiej przygody</p><h2>Nie musisz wymyślać przygody.<br /><em>Wystarczy ją rozpocząć.</em></h2><p>My przygotowujemy historię. Wy nadajecie jej życie: pytaniami, pomysłami i tym radosnym „już wiem!”. Bez aplikacji i bez pośpiechu.</p></div>
          <ol className="journey-steps">
            {[
              ["Zróbcie miejsce", "Kilka kartek, ołówek i kawałek stołu. Resztę dopowie wyobraźnia."],
              ["Otwórz sprawę", "Przeczytajcie wprowadzenie. Co się stało? Czego szukacie?"],
              ["Połączcie tropy", "Przyglądajcie się szczegółom, zadawajcie pytania i sprawdzajcie własne teorie."],
              ["Przeżyjcie odkrycie", "Dajcie sobie chwilę na pomyłki, nowe pomysły i wspólną radość z rozwiązania."],
            ].map(([title,copy],i)=><li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}
          </ol>
        </section>

        <section className="case-preview section-space" id="darmowy-pdf">
          <div className="wrap case-intro"><div><p className="section-label">W świecie Akademii</p><h2>Najciekawsze jest to,<br /><em>co odkryjecie sami.</em></h2></div><div><p>Nie zdradzimy Wam wszystkich tropów. W Akademii jest miejsce na zaskoczenie, chwilę namysłu i pomysły, na które wpadnie tylko Wasz zespół detektywów.</p><AnalyticsLink href="/darmowa-zagadka" className="text-link" analyticsCategory="lead" analyticsLabel="home_pdf_section" analyticsLocation="home_pdf_section">Poznajcie Akademię przez darmową sprawę <ArrowRight size={19} aria-hidden="true" /></AnalyticsLink></div><figure className="academy-first-cover"><Image src="/iwo-pdf-cover.webp" alt="Okładka darmowej zagadki: Sprawa Zaginionego Klejnotu" width={990} height={1400} sizes="180px" /><figcaption>Wasza pierwsza sprawa.</figcaption></figure></div>
          <div className="wrap discovery-stories">
            <div><span className="step-number">01 / Ciekawość</span><h3>„A co jest w środku?”</h3><p>Historia zaczyna się od pytania. Dalej prowadzi Was chęć odkrycia czegoś nieznanego.</p></div>
            <div><span className="step-number">02 / Wyobraźnia</span><h3>Więcej niż kartka.</h3><p>Notatki stają się dowodami, a dom miejscem przygody. Dziecko nie ogląda historii. Bierze w niej udział.</p></div>
            <div><span className="step-number">03 / Bliskość</span><h3>„Mamy to!”</h3><p>Wspólny trop, wymiana spojrzeń i radość z odkrycia. Małe chwile, do których chce się wracać.</p></div>
          </div>
        </section>

        <section className="age-section wrap section-space" id="wiek" aria-labelledby="age-heading">
          <div className="age-intro">
            <div><p className="section-label">Wybierz poziom</p><h2 id="age-heading">Zagadki dopasowane<br /><em>do wieku.</em></h2></div>
            <p>Każdy detektyw ma swoje tempo. Jedni dopiero poznają pierwsze tropy, inni już snują własne teorie. Najważniejsza jest ciekawość, nie wyścig do rozwiązania.</p>
          </div>
          <div className="age-paths">
            {DETECTIVE_LEVELS.map(item => <article className="age-path" key={item.age}>
              <div className="age-portrait"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 38vw, 280px" /></div>
              <div className="age-path-copy"><p className="section-label">{item.stage} · Poziom {item.level.toLowerCase()}</p><h3>{item.age}</h3><p className="age-character">{item.name}</p><p>{item.copy}</p></div>
            </article>)}
          </div>
        </section>

        <section className="coming-band" id="nowosci"><div className="wrap coming-inner"><div><p className="section-label">Świat Akademii rośnie</p><h2>To dopiero<br /><em>początek historii.</em></h2></div><div><p>Pracujemy nad fizycznymi teczkami ze śledztwem i akcesoriami. Chcemy dawać Wam kolejne powody, by usiąść razem i ruszyć tropem tajemnicy. Sklep jeszcze nie wystartował.</p><Link href="/sklep" className="text-link">Poznajcie kolejny rozdział Akademii <ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>

        <section className="wrap faq-section section-space" id="faq"><div><p className="section-label">Zanim ruszycie tropem</p><h2>Rodzice pytają.</h2><p>Praktyczne odpowiedzi, żeby łatwiej było zacząć.</p><a href="mailto:pomoc@malydetektyw.pl" className="text-link">Masz inne pytanie? Napisz do nas <ArrowRight size={17} aria-hidden="true" /></a></div><div className="faq-list">
          {schemaFAQHome.mainEntity.map(item=><details key={item.name}><summary>{item.name}<Plus size={20} aria-hidden="true" /></summary><p>{item.acceptedAnswer.text}</p></details>)}
        </div></section>

        <section className="free-invitation" id="kontakt"><div className="wrap"><p className="section-label">Wasza pierwsza wspólna sprawa</p><h2>Dzisiejsze popołudnie ma<br /><em>nowy scenariusz.</em></h2><p>Sprawdźcie, czy detektywistyczna przygoda jest dla Was. Zacznijcie od darmowej zagadki do druku.</p><AnalyticsLink href="/darmowa-zagadka" className="action action-light" analyticsCategory="lead" analyticsLabel="home_newsletter_cta" analyticsLocation="home_newsletter">Odbierz darmową sprawę PDF <ArrowRight size={19} aria-hidden="true" /></AnalyticsLink><p className="invitation-note">PDF otrzymasz po zapisie e-mail. <Link href="/polityka-prywatnosci">Polityka prywatności</Link></p></div></section>
      </main>
      <Footer home />
    </>
  );
}
