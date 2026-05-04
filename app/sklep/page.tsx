import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Sklep | Akademia Małego Detektywa",
  description:
    "Już wkrótce pierwsze teczki detektywistyczne dla dzieci. Zostaw e-mail i odbierz darmową sprawę PDF."
};

export default function ShopPage() {
  return (
    <>
      <Header active="shop" />
      <main>
        <section className="section detective-bg text-white">
          <div className="container text-center max-w-3xl">
            <p className="eyebrow">Sklep Akademii</p>

            <h1 className="title mt-2">
              Pierwsze sprawy w wersji teczek już wkrótce
            </h1>

            <p className="mt-6 text-base leading-7 text-white/80">
              Pracujemy nad fizycznymi teczkami detektywa — pełnymi zagadek, tropów i
              akcesoriów, które zamieniają pokój dziecka w prawdziwe biuro śledcze.
            </p>

            <p className="mt-4 text-base leading-7 text-white/80">
              Zostaw swój e-mail, a damy Ci znać jako pierwszemu, gdy tylko nowe sprawy będą dostępne.
            </p>

            <div className="mt-8 flex justify-center">
              <a href="/#kontakt" className="btn">
                🔍 Odbierz pierwszą sprawę
              </a>
            </div>
          </div>
        </section>

        {/* ✅ SEPARATOR – BEZ PRZYCINANIA */}
        <section className="bg-cream py-10">
          <div className="container flex justify-center">
            <img
              src="/amd.png"
              alt="Akademia Małego Detektywa"
              className="w-full max-w-5xl h-auto object-contain"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}