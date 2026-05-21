import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo";

const schemaLandingFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Czy zagadka PDF jest naprawdę darmowa?",
      acceptedAnswer: { "@type": "Answer", text: "Tak, pierwsza sprawa PDF jest w 100% bezpłatna. Wystarczy podać adres e-mail, a wyślemy plik natychmiast." },
    },
    {
      "@type": "Question",
      name: "Co zawiera darmowa zagadka detektywistyczna PDF?",
      acceptedAnswer: { "@type": "Answer", text: "Darmowa zagadka zawiera kompletną mini teczkę ze śledztwem: opis sprawy, tropy, podejrzanych, mapę miejsca zdarzenia i zadanie finałowe." },
    },
    {
      "@type": "Question",
      name: "Dla jakiego wieku jest darmowa zagadka?",
      acceptedAnswer: { "@type": "Answer", text: "Darmowa sprawa startowa jest przeznaczona dla dzieci 8–10 lat. To poziom łatwy–średni, idealny na pierwszy kontakt z Akademią Małego Detektywa." },
    },
    {
      "@type": "Question",
      name: "Czy muszę drukować PDF?",
      acceptedAnswer: { "@type": "Answer", text: "Tak, zagadka jest przeznaczona do druku. To celowy zabieg – papierowe teczki to 100% zabawy bez ekranu." },
    },
    {
      "@type": "Question",
      name: "Ile trwa zabawa z darmową sprawą?",
      acceptedAnswer: { "@type": "Answer", text: "Jedna sprawa zajmuje od 45 do 90 minut, w zależności od wieku i tempa dziecka." },
    },
  ],
};

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Darmowa zagadka detektywistyczna PDF – Sprawa Zaginionego Klejnotu",
  description: "Bezpłatna teczka śledcza PDF dla dzieci 8–10 lat. Zawiera sprawę, tropy, podejrzanych i zadanie finałowe.",
  image: `${SITE_URL}/pdf-cover.png`,
  brand: { "@type": "Brand", name: "Akademia Małego Detektywa" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "PLN", availability: "https://schema.org/InStock", url: `${SITE_URL}/darmowa-zagadka` },
};

const benefits = [
  { icon: "🔍", title: "Kompletna sprawa", desc: "Opis sytuacji, tropy, podejrzani i zadanie finałowe." },
  { icon: "🧩", title: "Logika i myślenie", desc: "Dziecko ćwiczy dedukcję i koncentrację." },
  { icon: "📵", title: "Zero ekranu", desc: "Papierowa zabawa – bez tabletu ani telefonu." },
  { icon: "⏱️", title: "45–90 minut", desc: "Wystarczy na jedno popołudnie w domu." },
  { icon: "🖨️", title: "Drukujesz i grasz", desc: "PDF gotowy do wydruku od razu po pobraniu." },
  { icon: "🎁", title: "Bez zobowiązań", desc: "Żadnej subskrypcji. Plik jest Twój na zawsze." },
];

const noScreenBenefits = [
  "Brak niebieskiego światła wieczorem",
  "Dziecko ćwiczy koncentrację i cierpliwość",
  "Naturalna przerwa od mediów społecznościowych",
  "Rodzic i dziecko grają razem – prawdziwy czas razem",
  "Śledztwo buduje poczucie sprawczości i sukcesu",
];

const faqItems = [
  { q: "Czy zagadka PDF jest naprawdę darmowa?", a: "Tak, 100% bezpłatna. Wystarczy adres e-mail – plik wysyłamy natychmiast." },
  { q: "Co zawiera darmowa zagadka?", a: "Kompletna mini teczka: opis sprawy, tropy, lista podejrzanych, mapa miejsca zdarzenia i zadanie finałowe." },
  { q: "Dla jakiego wieku?", a: "Poziom łatwy–średni, idealny dla dzieci 8–10 lat na pierwszy kontakt z Akademią." },
  { q: "Czy muszę drukować?", a: "Tak. To celowy zabieg – papierowa zabawa = zero ekranu." },
  { q: "Ile trwa zabawa?", a: "Od 45 do 90 minut, zależy od wieku i tempa dziecka." },
];

/* Reusable MailerLite form — styled to match the project */
function MailerLiteForm({ variant }: { variant: "dark" | "light" }) {
  const isDark = variant === "dark";
  return (
    <div id="mlb2-40808156" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-40808156">
      <div>
        <div className="ml-form-embedWrapper embedForm">

          {/* FORM STATE */}
          <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
            <form
              className="ml-block-form"
              action="https://assets.mailerlite.com/jsonp/2316254/forms/186553076507739391/subscribe"
              data-code=""
              data-analytics-submit-event="generate_lead"
              data-analytics-category="lead"
              data-analytics-label={`mailer_lite_${variant}`}
              data-analytics-location={variant === "dark" ? "landing_hero_form" : "landing_bottom_form"}
              method="post"
              target="_blank"
            >
              {/* Email input */}
              <div className="ml-form-formContent">
                <div className="ml-form-fieldRow ml-last-item">
                  <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <input
                      aria-label="email"
                      aria-required="true"
                      type="email"
                      className={`form-control w-full rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold mb-3 ${
                        isDark
                          ? "bg-ink border border-white/20 text-cream placeholder-cream/40"
                          : "bg-white border border-navy/20 text-navy placeholder-navy/40"
                      }`}
                      name="fields[email]"
                      placeholder="twoj@email.pl"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox consent */}
              <div className="ml-form-checkboxRow ml-validate-required mb-4">
                <label className="checkbox flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-gold flex-shrink-0" />
                  <p className={`text-xs leading-relaxed ${isDark ? "text-cream/60" : "text-navy/50"}`}>
                    Chcę otrzymać darmową zagadkę detektywa oraz wiadomości o nowych sprawach i produktach Akademii Małego Detektywa.
                  </p>
                </label>
              </div>

              {/* Privacy */}
              <p className={`text-xs mb-4 ${isDark ? "text-cream/30" : "text-navy/30"}`}>
                Zapisując się, akceptujesz{" "}
                <Link href="/polityka-prywatnosci" className="underline hover:opacity-70">
                  politykę prywatności
                </Link>
                .
              </p>

              <input type="hidden" name="ml-submit" value="1" />
              <input type="hidden" name="anticsrf" value="true" />

              {/* Submit */}
              <div className="ml-form-embedSubmit">
                <button
                  type="submit"
                  className="primary w-full bg-gold text-navy font-bold py-4 rounded-xl text-lg hover:bg-orange transition-colors"
                  data-analytics-event="click_download_puzzle"
                  data-analytics-category="lead"
                  data-analytics-label={`submit_pdf_form_${variant}`}
                  data-analytics-location={variant === "dark" ? "landing_hero_form" : "landing_bottom_form"}
                >
                  Wyślij mi darmową zagadkę PDF →
                </button>
                <button
                  disabled
                  type="button"
                  className="loading hidden w-full bg-gold/60 text-navy font-bold py-4 rounded-xl text-lg cursor-not-allowed"
                >
                  <div className="inline-block w-5 h-5 border-4 border-navy/30 border-t-navy rounded-full animate-spin mr-2 align-middle" />
                  <span className="sr-only">Wysyłanie…</span>
                </button>
              </div>
            </form>
          </div>

          {/* SUCCESS STATE */}
          <div className="ml-form-successBody row-success" style={{ display: "none" }}>
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🕵️‍♂️</div>
              <h2 className={`font-display text-2xl mb-2 ${isDark ? "text-gold" : "text-navy"}`}>
                Gratulacje!
              </h2>
              <p className={isDark ? "text-cream/70" : "text-navy/70"}>
                Sprawdź swojego maila, aby odebrać pierwszą, darmową zagadkę!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function DarmowaZagadkaPage() {
  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLandingFAQ) }} />
      <Script id="schema-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />

      {/* MailerLite — loaded lazily, won't block LCP */}
      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b"
        strategy="lazyOnload"
      />
      <Script id="ml-init" strategy="lazyOnload">{`
        fetch("https://assets.mailerlite.com/jsonp/2316254/forms/186553076507739391/takel");
        function ml_webform_success_40808156() {
          var $ = ml_jQuery || jQuery;
          $('.ml-subscribe-form-40808156 .row-success').show();
          $('.ml-subscribe-form-40808156 .row-form').hide();
        }
      `}</Script>

      {/* NAV */}
      <header className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo Akademii Małego Detektywa" width={32} height={32} />
            <span className="font-display text-cream text-base">
              <span className="text-gold">Akademia</span> Małego Detektywa
            </span>
          </Link>
          <Link href="/sklep" className="text-cream/70 text-sm hover:text-gold transition-colors">Sklep →</Link>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="bg-navy text-cream py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">🎁 Bezpłatna teczka śledcza PDF</p>
              <h1 className="font-display text-4xl md:text-5xl text-cream leading-tight mb-4">
                Pobierz darmową zagadkę detektywistyczną PDF dla dzieci
              </h1>
              <p className="text-cream/75 text-lg mb-8 leading-relaxed">
                Pierwsza sprawa z Akademii Małego Detektywa — zupełnie bezpłatna. Wydrukuj, daj dziecku i obserwuj, jak zamienia się w detektywa FOX-a.
              </p>
              <MailerLiteForm variant="dark" />
            </div>
            <div className="flex justify-center">
              <Image
                src="/pdf-cover.png"
                alt="Okładka darmowej zagadki detektywistycznej PDF – Sprawa Zaginionego Klejnotu dla dzieci 8-10 lat"
                width={340}
                height={440}
                priority
                className="rounded-3xl shadow-soft"
              />
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="bg-paper py-16 px-4" aria-label="Co zawiera darmowa zagadka PDF">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-navy">Co dostajesz za darmo?</h2>
              <p className="text-navy/60 mt-2">Kompletna sprawa, nie tylko próbka.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-cream rounded-2xl p-6 border border-navy/10 hover:border-gold/40 transition-colors">
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="font-display text-lg text-navy mb-1">{b.title}</h3>
                  <p className="text-navy/60 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NO SCREEN */}
        <section className="bg-navy py-16 px-4" aria-label="Zabawa bez ekranu dla dzieci">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">📵 Bez ekranu</p>
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">
                Detektywistyczna zabawa bez tabletu i telefonu
              </h2>
              <p className="text-cream/70 mb-6 leading-relaxed">
                Każda teczka to papierowa przygoda — szyfry, tropy i zagadki, które wymagają myślenia, nie klikania.
              </p>
              <ul className="space-y-3">
                {noScreenBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/80 text-sm">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink rounded-3xl p-8 border border-white/10 text-center">
              <div className="text-6xl mb-4">📵</div>
              <p className="font-display text-2xl text-cream mb-2">100% bez ekranu</p>
              <p className="text-cream/60 text-sm mb-6">Teczka, szyfry, notatnik detektywa. Żadnego tabletu, żadnego telefonu.</p>
              <a href="#formularz" className="bg-gold text-navy font-bold px-6 py-3 rounded-full text-sm hover:bg-orange transition-colors">
                Pobierz darmowe śledztwo
              </a>
            </div>
          </div>
        </section>

        {/* SECOND CTA FORM */}
        <section className="bg-cream py-16 px-4" id="formularz" aria-label="Pobierz darmową zagadkę PDF – formularz">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-orange text-xs font-bold uppercase tracking-widest mb-3">Ostatni krok</p>
            <h2 className="font-display text-3xl md:text-4xl text-navy mb-4">Wyślij mi darmową zagadkę PDF</h2>
            <p className="text-navy/60 mb-8">Podaj e-mail, a teczka detektywa trafi do Ciebie w ciągu minuty.</p>
            <MailerLiteForm variant="light" />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper py-16 px-4" aria-label="FAQ – darmowa zagadka detektywistyczna PDF">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-navy text-center mb-10">Masz pytania?</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="bg-cream rounded-2xl p-6 border border-navy/10 group">
                  <summary className="font-semibold text-navy cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-gold group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-4 text-navy/70 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-navy/50 text-sm mb-4">Jeszcze pytania?</p>
              <Link href="/kontakt" className="text-orange font-semibold hover:underline">Napisz do nas →</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-cream/50 py-8 px-4 text-sm text-center">
        <p>© 2026 Akademia Małego Detektywa. <Link href="/polityka-prywatnosci" className="underline hover:text-cream/70">Polityka prywatności</Link></p>
      </footer>
    </>
  );
}
