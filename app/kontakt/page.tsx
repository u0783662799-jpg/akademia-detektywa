"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const messengerLink = "https://m.me/61588919505427";

export default function ContactPage() {
  return (
    <>
      <Header active="contact" />
      <main>
        <section className="section detective-bg text-white">
          <div className="container text-center max-w-2xl">
            <p className="eyebrow">Kontakt</p>

            <h1 className="title mt-2">
              Masz pytanie? Napisz do nas
            </h1>

            <p className="mt-6 text-base leading-7 text-white/80">
              Najszybciej odpowiadamy na Messengerze.  
              Możesz zapytać o dobór sprawy, wiek dziecka albo szczegóły zestawów.
            </p>

            <div className="mt-10 flex justify-center">
              <a
                href={messengerLink}
                target="_blank"
                rel="noreferrer"
                className="btn text-lg px-8 py-4"
              >
                💬 Napisz na Messengerze
              </a>
            </div>

            <p className="mt-6 text-sm text-white/60">
              Odpowiadamy zazwyczaj w ciągu kilku godzin
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}