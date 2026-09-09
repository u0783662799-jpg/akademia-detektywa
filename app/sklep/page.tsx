import type { Metadata } from "next";
import Image from "next/image";
import AnalyticsLink from "@/components/AnalyticsLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DEFAULT_META, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sklep",
  description:
    "Poznaj sklep Akademii Małego Detektywa. Papierowe teczki ze śledztwem, zestawy premium i darmowa sprawa PDF dla dzieci 8-12 lat.",
  alternates: {
    canonical: `${SITE_URL}/sklep`,
  },
  openGraph: {
    title: "Sklep | Akademia Małego Detektywa",
    description:
      "Pierwsze teczki detektywistyczne dla dzieci już wkrótce. Zobacz serię FOX-a i odbierz darmową sprawę PDF.",
    url: `${SITE_URL}/sklep`,
    images: [
      {
        url: DEFAULT_META.ogImage,
        width: 1200,
        height: 630,
        alt: "Sklep Akademii Małego Detektywa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sklep | Akademia Małego Detektywa",
    description:
      "Teczki ze śledztwem, zestawy premium i darmowa sprawa PDF dla dzieci 8-12 lat.",
    images: [DEFAULT_META.ogImage],
  },
};

export default function ShopPage() {
  return (
    <>
      <Header active="shop" />

      <main>
        <section className="section bg-cream">
          <div className="container max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Sklep Akademii</p>

              <h1 className="title mt-4">
                Pierwsze sprawy w wersji teczek już wkrótce
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-navy/75 md:text-lg">
                Pracujemy nad fizycznymi teczkami detektywa pełnymi zagadek,
                tropów i akcesoriów, które zamieniają pokój dziecka w prawdziwe
                biuro śledcze.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-navy/70">
                Zanim sklep ruszy pełną parą, możesz pobrać darmową sprawę PDF i
                zobaczyć, czy ten świat jest dla Twojego małego detektywa.
              </p>

              <div className="mt-8 flex justify-center">
                <AnalyticsLink href="/#darmowy-pdf" analyticsCategory="lead" analyticsLabel="shop_free_pdf" analyticsLocation="shop_coming_soon" className="btn">
                  Odbierz darmową sprawę
                </AnalyticsLink>
              </div>
            </div>

            <div className="mt-14 flex justify-center">
              <div className="w-full max-w-4xl rounded-[2rem] bg-paper/70 p-4 shadow-soft sm:p-6">
                <Image
                  src="/amd.png"
                  alt="Akademia Małego Detektywa - zapowiedź sklepu z teczkami detektywistycznymi"
                  width={1400}
                  height={1000}
                  priority
                  className="mx-auto h-auto w-full rounded-[1.5rem] object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
