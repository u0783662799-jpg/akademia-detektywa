import AgeCards from "@/components/AgeCards";
import BenefitsStrip from "@/components/BenefitsStrip";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductHighlight from "@/components/ProductHighlight";
import type { Metadata } from "next";

const parentBenefits = [
  "Rozwija logikę",
  "Ogranicza ekran",
  "Świetna zabawa w domu",
  "Edukacyjne",
  "Kreatywne"
];

export const metadata: Metadata = {
  title: "Akademia Małego Detektywa | Detektywistyczne zagadki dla dzieci",
  description:
    "Darmowy PDF, papierowe teczki ze śledztwem i wydanie premium z latarką UV. Akademia Małego Detektywa dla dzieci 8-12 lat."
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BenefitsStrip />

        <section id="pdf" className="hidden bg-paper md:block">
          <div className="container grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10">
            <div>
              <p className="eyebrow">Darmowy start</p>
              <h2 className="title text-navy">Pobierz pierwszą sprawę PDF</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
                Jedna kompletna mini teczka z zagadką, tropami i zadaniem finałowym. Idealna,
                żeby sprawdzić, czy Twoje dziecko pokocha świat śledztw FOX-a.
              </p>
            </div>
            <div className="grid gap-5 rounded-2xl border-2 border-dashed border-gold bg-white/75 p-4 shadow-soft sm:p-5 md:grid-cols-[220px_1fr] md:p-6">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gold/20 blur-2xl" />
                <img
                  src="/pdf-cover.png"
                  alt="Okładka darmowej zagadki PDF Sprawa Zaginionego Klejnotu"
                  className="relative mx-auto aspect-[3/4] w-full max-w-[240px] rounded-2xl object-cover shadow-soft md:max-w-none"
                />
              </div>
              <div className="flex items-center">
                <div>
                  <div className="mb-4 inline-flex rounded-full bg-navy px-4 py-2 text-xs font-black uppercase text-gold">
                    Darmowa zagadka PDF
                  </div>
                  <h3 className="font-display text-[1.65rem] uppercase leading-tight text-navy sm:text-2xl">
                    Sprawa Zaginionego Klejnotu
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Pobierz okładkową sprawę startową i zaproś dziecko do pierwszego śledztwa z FOX-em.
                    W środku: tropy, podejrzani, miejsce zbrodni i notatki detektywa.
                  </p>
                  <a className="btn mt-6" href="#kontakt">Pobierz darmową zagadkę</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AgeCards />
        <ProductHighlight />
        <Faq />

        <section className="section bg-cream">
          <div className="container">
            <p className="eyebrow text-center">Dlaczego rodzice to lubią</p>
            <h2 className="title mx-auto max-w-2xl text-center text-navy">
              Zabawa, która uczy myślenia i odciąga od ekranu
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {parentBenefits.map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 text-center text-[0.82rem] font-bold shadow-soft sm:text-sm">
                  <span className="mx-auto mb-3 block h-9 w-9 rounded-full border-2 border-orange paw-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="section bg-navy text-white">
          <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
            <div>
              <p className="eyebrow">Klub detektywa</p>
              <h2 className="title">Bądź na bieżąco</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
                Otrzymuj informacje o nowych sprawach, promocjach i darmowych materiałach dla
                młodych detektywów.
              </p>
              <div className="mt-6 grid max-w-xl gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3">
                {["Nowe sprawy", "Kody rabatowe", "Darmowe PDF-y"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/8 px-4 py-3 text-xs font-black uppercase ring-1 ring-white/10 sm:text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ POPRAWIONY FORMULARZ */}
            <div className="rounded-3xl bg-white p-5 text-ink shadow-soft sm:p-6">
              <p className="font-display text-2xl uppercase text-navy">Dołącz do Akademii</p>
              <p className="mt-2 text-slate-700">
                 Czas na Twoje pierwsze zadanie. Odbierz darmową sprawę!
              </p>

              <div
                className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: `
                  <form id="ml-form" style="display:flex;gap:10px;flex-wrap:wrap;">
                    
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Twój e-mail" 
                      required 
                      style="flex:1;height:48px;border-radius:12px;border:1px solid #e2e8f0;padding:0 16px;"
                    />

                    <button 
                      type="submit" 
                      style="height:48px;padding:0 20px;border-radius:12px;background:#facc15;font-weight:700;">
                      Odbierz DARMOWĄ sprawę
                    </button>

                    <div style="width:100%;margin-top:10px;font-size:12px;">
                      <label style="display:flex;gap:8px;align-items:flex-start;">
                        <input type="checkbox" required />
                        <span>
                          Chcę otrzymać darmową zagadkę detektywa oraz wiadomości o nowych sprawach i produktach.
                        </span>
                      </label>
                    </div>

                    <p style="width:100%;font-size:12px;color:#64748b;">
                      Zapisując się, akceptujesz 
                      <a href="/polityka-prywatnosci">politykę prywatności</a>.
                    </p>

                  </form>

                  <div id="ml-success" style="display:none;margin-top:20px;">
                    <h4>Gotowe! 🕵️‍♂️</h4>
                    <p>Sprawdź swoją skrzynkę – wysłaliśmy Ci pierwszą sprawę detektywa.</p>
                  </div>

                  <script>
                  document.getElementById("ml-form").addEventListener("submit", async function(e) {
                    e.preventDefault();

                    const email = this.querySelector('input[name="email"]').value;

                    await fetch("https://assets.mailerlite.com/jsonp/2316254/forms/186553076507739391/subscribe", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      body: new URLSearchParams({
                        "fields[email]": email,
                        "ml-submit": "1",
                        "anticsrf": "true"
                      })
                    });

                    this.style.display = "none";
                    document.getElementById("ml-success").style.display = "block";
                  });
                  </script>
                `,
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}