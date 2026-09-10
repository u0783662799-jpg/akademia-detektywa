export const SITE_URL = "https://malydetektyw.pl";
export const SITE_NAME = "Akademia Małego Detektywa";

export const DEFAULT_META = {
  title: "Zagadki detektywistyczne dla dzieci 8-12 lat | Detektyw IWO",
  description:
    "Papierowe zagadki detektywistyczne dla dzieci 8-12 lat. Detektyw IWO towarzyszy dziecku, które analizuje tropy i odkrywa rozwiązanie. Przygoda bez ekranu i czas razem.",
  ogImage: `${SITE_URL}/iwo-social.webp`,
  keywords:
    "zagadki detektywistyczne dla dzieci, gry detektywistyczne PDF, teczka detektywa, zagadki dla dzieci 8-12 lat, zabawa bez ekranu, śledztwa dla dzieci",
};

export const SOCIAL_IMAGE = {
  url: DEFAULT_META.ogImage,
  width: 630,
  height: 630,
  alt: "Akademia Małego Detektywa - Detektyw IWO",
};

export const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/iwo-logo.png`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Polish",
  },
};

export const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pl-PL",
};

export const schemaFAQHome = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Dla jakiego wieku są zagadki Akademii Małego Detektywa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nasze sprawy są przeznaczone dla dzieci w wieku 8-12 lat i podzielone na trzy poziomy trudności: łatwy (8 lat), średni (9-10 lat) i trudny (11-12 lat).",
      },
    },
    {
      "@type": "Question",
      name: "Czy dziecko może rozwiązać sprawę samodzielnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak, sprawy są zaprojektowane tak, by dziecko mogło działać samodzielnie. Starsze dzieci (10-12 lat) zazwyczaj dają radę solo - młodszym może towarzyszyć rodzic jako partner w śledztwie.",
      },
    },
    {
      "@type": "Question",
      name: "Czy wydanie premium jest już dostępne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jeszcze nie. Pracujemy nad fizycznymi teczkami ze śledztwem i akcesoriami. Szczegóły zawartości podamy przed premierą. Teraz możecie rozpocząć przygodę od bezpłatnej zagadki PDF do druku.",
      },
    },
    {
      "@type": "Question",
      name: "Ile będą kosztować kolejne sprawy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ceny kolejnych spraw nie zostały jeszcze ogłoszone. Sklep jest w przygotowaniu i nie przyjmujemy zamówień. Pierwsza zagadka PDF jest bezpłatna po zapisie e-mail.",
      },
    },
    {
      "@type": "Question",
      name: "Czy to jest zabawa bez ekranu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak! Wszystkie teczki detektywistyczne to w 100% zabawa bez ekranu. Dziecko pracuje z papierowymi materiałami, szyframi i wskazówkami - bez tabletu, telefonu ani komputera.",
      },
    },
    {
      "@type": "Question",
      name: "Czy trzeba drukować zagadki z Akademii Małego Detektywa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dostępna teraz darmowa zagadka PDF wymaga samodzielnego wydruku. Fizyczne zestawy, które nie będą wymagały drukarki, są dopiero w przygotowaniu.",
      },
    },
    {
      "@type": "Question",
      name: "Ile trwa jedna sprawa detektywa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jedna sprawa zajmuje zazwyczaj od 45 do 90 minut, w zależności od wieku dziecka i poziomu trudności.",
      },
    },
    {
      "@type": "Question",
      name: "Czy będą kolejne sprawy do kupienia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak! Pracujemy nad kolejnymi sprawami w ramach Akademii Małego Detektywa. Zapisz się do klubu detektywa, żeby jako pierwszy dowiedzieć się o nowych tytułach i promocjach.",
      },
    },
  ],
};
