import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Plus } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export { metadata } from "./metadata";

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
      acceptedAnswer: { "@type": "Answer", text: "Darmowa sprawa startowa jest przeznaczona dla dzieci 8-10 lat. To poziom łatwy-średni, idealny na pierwszy kontakt z Akademią Małego Detektywa." },
    },
    {
      "@type": "Question",
      name: "Czy muszę drukować PDF?",
      acceptedAnswer: { "@type": "Answer", text: "Tak, zagadka jest przeznaczona do druku. To celowy zabieg - papierowe teczki to 100% zabawy bez ekranu." },
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
  name: "Darmowa zagadka detektywistyczna PDF - Sprawa Zaginionego Klejnotu",
  description: "Bezpłatna teczka śledcza PDF dla dzieci 8-10 lat. Zawiera sprawę, tropy, podejrzanych i zadanie finałowe.",
  image: `${SITE_URL}/iwo-pdf-cover.webp`,
  brand: { "@type": "Brand", name: "Akademia Małego Detektywa" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "PLN", availability: "https://schema.org/InStock", url: `${SITE_URL}/darmowa-zagadka` },
};

const faqItems = [
  { q: "Czy zagadka PDF jest naprawdę darmowa?", a: "Tak, 100% bezpłatna. Wystarczy adres e-mail - plik wysyłamy natychmiast." },
  { q: "Co zawiera darmowa zagadka?", a: "Kompletna mini teczka: opis sprawy, tropy, lista podejrzanych, mapa miejsca zdarzenia i zadanie finałowe." },
  { q: "Dla jakiego wieku?", a: "Poziom łatwy-średni, idealny dla dzieci 8-10 lat na pierwszy kontakt z Akademią." },
  { q: "Czy muszę drukować?", a: "Tak. To celowy zabieg - papierowa zabawa = zero ekranu." },
  { q: "Ile trwa zabawa?", a: "Od 45 do 90 minut, zależy od wieku i tempa dziecka." },
];

/* Reusable MailerLite form - styled to match the project */
function MailerLiteForm({ variant }: { variant: "dark" | "light" }) {
  const isDark = variant === "dark";
  return (
    <div id={`mlb2-40808156_${variant}`} className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-40808156 puzzle-form">
      <div>
        <div className="ml-form-embedWrapper embedForm">

          {/* FORM STATE */}
          <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
            <form
              className="ml-block-form"
              action="https://assets.mailerlite.com/jsonp/2316254/forms/186553076507739391/subscribe"
              data-code=""
              data-analytics-success-event="generate_lead"
              data-analytics-form-id={isDark ? "free_puzzle_hero" : "free_puzzle_bottom"}
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
                    <label className="email-label" htmlFor={`puzzle-email-${variant}`}>Twój adres e-mail</label>
                    <input
                      id={`puzzle-email-${variant}`}
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

      {/* MailerLite - loaded lazily, won't block LCP */}
      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b"
        strategy="lazyOnload"
      />
      <Script id="ml-init" strategy="lazyOnload">{`
        fetch("https://assets.mailerlite.com/jsonp/2316254/forms/186553076507739391/takel");
        var submittedForms = new WeakSet();
        var completedForms = new WeakSet();
        var configuredClients = new WeakSet();
        var requestSequence = 0;
        document.addEventListener("submit", function(event) {
          var form = event.target;
          if (!form || !form.matches || !form.matches(".ml-block-form[data-analytics-success-event]")) return;

          var client = window.ml_jQuery;
          if (client && !configuredClients.has(client)) {
            // Run before jQuery's JSONP prefilter to isolate concurrent embed responses.
            client.ajaxPrefilter("+jsonp", function(options) {
              var url = new URL(options.url, window.location.href);
              if (url.origin === "https://assets.mailerlite.com" &&
                  url.pathname === "/jsonp/2316254/forms/186553076507739391/subscribe") {
                options.jsonpCallback = "amdMlResponse_" + (++requestSequence);
              }
            });
            configuredClients.add(client);
          }
          submittedForms.add(form);
        }, true);
        // MailerLite derives this callback name from the embed container ID.
        ["dark", "light"].forEach(function(variant) {
          window["ml_webform_success_40808156_" + variant] = function() {
            var container = document.getElementById("mlb2-40808156_" + variant);
            var form = container && container.querySelector("form");
            if (!form || !submittedForms.has(form) || completedForms.has(form)) return;
            // Success is terminal for this embed, including repeated callbacks.
            completedForms.add(form);
            container.querySelector(".row-success").style.display = "block";
            container.querySelector(".row-form").style.display = "none";
            window.dispatchEvent(new CustomEvent("amd:lead-success", {
              detail: {
                eventName: "generate_lead",
                event_category: form.dataset.analyticsCategory,
                event_label: form.dataset.analyticsLabel,
                location: form.dataset.analyticsLocation,
                form_id: form.dataset.analyticsFormId,
                lead_type: "free_puzzle"
              }
            }));
          };
        });
      `}</Script>

      <Header />
      <main id="main-content" className="free-page">
        <section className="free-hero">
          <div className="wrap">
            <div className="free-hero-copy"><p className="section-label">Sprawa Zaginionego Klejnotu · 8-10 lat</p><h1>Darmowa<br /><em>zagadka PDF.</em></h1><p className="lead-copy">Pierwszy trop do Waszej wspólnej przygody.</p><p>Odbierz materiały, wydrukuj je i rozpocznijcie śledztwo. Mapa zamku, podejrzani i wskazówki już na Was czekają.</p>
              <MailerLiteForm variant="dark" />
              <p className="form-footnote">Do wydruku w domu · Zabawa bez ekranu · 45-90 minut</p>
            </div>
            <figure className="free-hero-art"><Image src="/iwo-pdf-cover.webp" alt="Okładka darmowej Sprawy Zaginionego Klejnotu" width={990} height={1400} priority sizes="(max-width: 700px) 250px, 380px" /><figcaption>Wasza pierwsza sprawa.<br /><em>Od niej wszystko się zaczyna.</em></figcaption></figure>
          </div>
        </section>
        <section className="wrap section-space free-materials" aria-label="Co zawiera darmowa zagadka PDF">
          <div className="section-intro"><p className="section-label">Zajrzyj do środka</p><h2>Nie pusta kartka.<br /><em>Cała tajemnica.</em></h2><p>Opis sprawy, mapa, podejrzani i tropy. Dziecko obserwuje, porównuje wskazówki i zapisuje własne wnioski.</p></div>
          <div className="actual-pages">
            <figure><Image src="/iwo-puzzle-map.webp" alt="Mapa zamku z darmowego PDF: galeria, biblioteka, ogród i ślady" width={990} height={1400} sizes="(max-width: 700px) 85vw, 330px" /><figcaption><span>Mapa zamku</span>Gdzie szukać kolejnej wskazówki?</figcaption></figure>
            <figure><Image src="/iwo-puzzle-suspects.webp" alt="Lista podejrzanych i miejsce na wnioski dziecka, strona darmowego PDF" width={990} height={1400} sizes="(max-width: 700px) 85vw, 330px" /><figcaption><span>Fakty i poszlaki</span>Nie wszystko jest takie, jak się wydaje.</figcaption></figure>
          </div>
        </section>
        <section className="together-band"><div className="wrap"><p className="section-label">Na podłodze, przy stole, razem</p><h2>Odłóżcie ekrany.<br /><em>Rozłóżcie wskazówki.</em></h2><p>Wydrukowane materiały, ołówek i ciekawość wystarczą na początek. Możesz czytać wspólnie z dzieckiem albo dać mu przestrzeń na własne pomysły.</p><a href="#formularz" data-analytics-event="click_download_puzzle" data-analytics-category="lead" data-analytics-label="landing_jump_to_form" data-analytics-location="landing_no_screen" className="text-link">Pobierz darmowe śledztwo <ArrowRight size={19} aria-hidden="true" /></a></div></section>
        <section className="wrap section-space bottom-form-section" id="formularz" aria-label="Pobierz darmową zagadkę PDF - formularz">
          <div><p className="section-label">Gotowi na pierwszy trop?</p><h2>Przygoda zaczyna się<br /><em>w Waszej skrzynce.</em></h2><p>Podaj e-mail, aby otrzymać darmową zagadkę i wiadomości z Akademii.</p></div><div><MailerLiteForm variant="light" /></div>
        </section>
        <section className="wrap faq-section section-space" aria-label="FAQ - darmowa zagadka detektywistyczna PDF"><div><p className="section-label">Dobrze wiedzieć</p><h2>Masz pytania?</h2><a href="mailto:pomoc@malydetektyw.pl" className="text-link">Napisz do nas <ArrowRight size={18} aria-hidden="true" /></a></div><div className="faq-list">{faqItems.map(item=><details key={item.q}><summary>{item.q}<Plus size={20} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
