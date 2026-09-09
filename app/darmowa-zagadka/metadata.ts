import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Darmowa zagadka detektywistyczna PDF dla dzieci 8-10 lat",
  description:
    "Pobierz bezpłatną teczkę śledczą PDF dla dzieci 8–10 lat. Odkryj świat Detektywa IWO: szyfry, tropy i zadanie finałowe. Papierowa przygoda bez ekranu.",
  alternates: { canonical: `${SITE_URL}/darmowa-zagadka` },
  openGraph: {
    title: "Darmowa zagadka detektywistyczna PDF dla dzieci",
    description:
      "Bezpłatna teczka śledcza PDF: sprawa, tropy, podejrzani i zadanie finałowe. Dla dzieci 8–10 lat. Pobierz i wydrukuj od razu!",
    url: `${SITE_URL}/darmowa-zagadka`,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Darmowa zagadka detektywistyczna PDF dla dzieci",
    description: "Bezpłatna teczka śledcza PDF dla dzieci 8–10 lat. Pobierz teraz!",
    images: [SOCIAL_IMAGE.url],
  },
};
