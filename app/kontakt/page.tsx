import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DEFAULT_META, SITE_URL } from "@/lib/seo";

const messengerLink = "https://m.me/61588919505427";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z Akademią Małego Detektywa. Pomożemy dobrać odpowiednią sprawę, poziom trudności i odpowiemy na pytania o przygody Detektywa IWO.",
  alternates: {
    canonical: `${SITE_URL}/kontakt`,
  },
  openGraph: {
    title: "Kontakt | Akademia Małego Detektywa",
    description:
      "Masz pytanie o zagadki, wiek dziecka lub zestawy premium? Napisz do Akademii Małego Detektywa.",
    url: `${SITE_URL}/kontakt`,
    images: [
      {
        url: DEFAULT_META.ogImage,
        width: 1200,
        height: 630,
        alt: "Kontakt z Akademią Małego Detektywa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Akademia Małego Detektywa",
    description:
      "Napisz do nas, jeśli chcesz dobrać odpowiednią sprawę detektywistyczną dla dziecka.",
    images: [DEFAULT_META.ogImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header active="contact" />

      <main id="main-content" className="contact-page">
        <section className="section bg-cream">
          <div className="container max-w-5xl">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-8 w-full max-w-2xl md:mb-12">
                <Image
                  src="/kontakt-mess.png"
                  alt="Kontakt na Messengerze - Akademia Małego Detektywa"
                  width={900}
                  height={900}
                  priority
                  className="mx-auto h-auto w-full object-contain drop-shadow-xl"
                />
              </div>

              <div className="mx-auto flex max-w-2xl flex-col items-center">
                <p className="eyebrow">Kontakt</p>

                <h1 className="title mt-4">
                  Masz pytanie?
                  <br />
                  Napisz do nas na Messengerze
                </h1>

                <p className="mt-6 text-base leading-7 text-navy/75 md:text-lg">
                  Chętnie pomożemy dobrać odpowiednią sprawę detektywistyczną,
                  poziom trudności albo odpowiemy na pytania o zestawy Akademii
                  Małego Detektywa.
                </p>

                <div className="mt-8 flex justify-center">
                  <a
                    href={messengerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[#0084FF] px-7 py-3.5 text-base font-semibold text-white shadow-soft transition duration-300 hover:scale-[1.02] hover:bg-[#0077e6] sm:px-8 sm:py-4 sm:text-lg"
                  >
                    <span className="text-2xl" aria-hidden="true">
                      💬
                    </span>
                    <span>Napisz na Messengerze</span>
                  </a>
                </div>

                <p className="mt-4 text-sm text-navy/55">
                  Odpowiadamy zazwyczaj w ciągu kilku godzin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
