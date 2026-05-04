import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header active="checkout" />
      <main>
        <section className="section detective-bg text-white">
          <div className="container grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-soft backdrop-blur sm:p-6">
              <p className="eyebrow">Płatność</p>
              <h1 className="title">Szablon przejścia do finalizacji zamówienia</h1>
              <p className="mt-4 text-sm leading-6 text-white/78">
                To jest przygotowane miejsce pod dane kupującego, adres dostawy, metody płatności
                i końcowe potwierdzenie zakupu.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-5 text-ink shadow-soft sm:p-6">
              <p className="font-display text-[1.8rem] uppercase text-navy">Co możemy podpiąć dalej</p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <li>Formularz danych zamawiającego</li>
                <li>Wybór dostawy</li>
                <li>Integrację płatności</li>
                <li>Potwierdzenie zamówienia i e-mail</li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/koszyk" className="dark-btn border border-navy/10 bg-navy text-center">
                  Wróć do koszyka
                </Link>
                <Link href="/sklep" className="btn">
                  Wróć do sklepu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
