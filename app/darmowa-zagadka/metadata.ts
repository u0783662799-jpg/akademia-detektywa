import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Darmowa zagadka detektywistyczna PDF dla dzieci 8-10 lat",
  description:
    "Pobierz bezpłatną teczkę śledczą PDF dla dzieci 8–10 lat. Sprawa Zaginionego Klejnotu z FOX-em – szyfry, tropy i zadanie finałowe. Zero ekranu, 100% zabawy!",
  alternates: { canonical: `${SITE_URL}/darmowa-zagadka` },
  openGraph: {
    title: "Darmowa zagadka detektywistyczna PDF dla dzieci",
    description:
      "Bezpłatna teczka śledcza PDF: sprawa, tropy, podejrzani i zadanie finałowe. Dla dzieci 8–10 lat. Pobierz i wydrukuj od razu!",
    url: `${SITE_URL}/darmowa-zagadka`,
    images: [{ url: `${SITE_URL}/og-pdf.png`, width: 1200, height: 630, alt: "Darmowa zagadka detektywistyczna PDF dla dzieci – Akademia Małego Detektywa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darmowa zagadka detektywistyczna PDF dla dzieci",
    description: "Bezpłatna teczka śledcza PDF dla dzieci 8–10 lat. Pobierz teraz!",
  },
};

export { default } from "./page";
