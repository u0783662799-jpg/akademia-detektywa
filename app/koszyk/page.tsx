import { redirect } from "next/navigation";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CartPage() {

  // ✅ UKRYCIE STRONY
  redirect("/");

  return (
    <>
      <Header active="cart" />
      <main>
        <section className="section paper-bg">
          <div className="container grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[2rem] border border-[#e3ccaa] bg-white p-5 shadow-soft sm:p-6">
              <p className="eyebrow text-navy">Koszyk</p>
              <h1 className="title text-navy">Twój koszyk jest gotowy na dalsze podpięcie</h1>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                To jest szablon koszyka. W kolejnym kroku możemy podpiąć prawdziwe dodawanie produktów,
                liczenie wariantów oraz sumę zamówienia.
              </p>

              <div className="mt-6 rounded-2xl border border-[#ead7b5] bg-[#fff9ef] p-4">
                <p className="text-sm font-black uppercase text-navy">Przykładowa pozycja</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Sprawa nr 1 Premium, wariant: latarka + gadżety startowe
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-navy p-5 text-white shadow-soft sm:p-6">
              <p className="text-xs font-black uppercase text-gold">Podsumowanie</p>
              <h2 className="mt-2 font-display text-[1.8rem] uppercase">Szablon zamówienia</h2>
              <p className="mt-4 text-sm leading-6 text-white/75">
                To miejsce jest przygotowane pod prawdziwe podsumowanie koszyka, dane dostawy i przejście dalej.
              </p>

              <div className="mt-6 grid gap-3">
                <Link href="/platnosc" className="btn">
                  Przejdź do płatności
                </Link>
                <Link href="/sklep" className="dark-btn border border-white/15 bg-white/10 text-center">
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