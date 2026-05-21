export const SITE_URL = "https://malydetektyw.pl";
export const SITE_NAME = "Akademia Małego Detektywa";

export const DEFAULT_META = {
  title: "Zagadki detektywistyczne dla dzieci 8-12 lat | FOX",
  description:
    "Papierowe zagadki detektywistyczne dla dzieci 8–12 lat. Teczki ze śledztwem, szyfry i tropy. Pobierz darmową sprawę PDF i sprawdź, czy Twoje dziecko pokocha misje z FOX-em!",
  ogImage: `${SITE_URL}/og-image.png`,
  keywords:
    "zagadki detektywistyczne dla dzieci, gry detektywistyczne PDF, teczka detektywa, zagadki dla dzieci 8-12 lat, zabawa bez ekranu, śledztwa dla dzieci",
};

export const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
        text: "Nasze sprawy są przeznaczone dla dzieci w wieku 8–12 lat i podzielone na trzy poziomy trudności: łatwy (8 lat), średni (9–10 lat) i trudny (11–12 lat).",
      },
    },
    {
      "@type": "Question",
      name: "Czy dziecko może rozwiązać sprawę samodzielnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak, sprawy są zaprojektowane tak, by dziecko mogło działać samodzielnie. Starsze dzieci (10–12 lat) zazwyczaj dają radę solo — młodszym może towarzyszyć rodzic jako partner w śledztwie.",
      },
    },
    {
      "@type": "Question",
      name: "Co znajduje się w pierwszym wydaniu premium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wydanie premium zawiera: teczkę z zagadką, latarkę UV, notatnik detektywa oraz akcesoria śledcze. To najbardziej rozbudowany zestaw w całej serii.",
      },
    },
    {
      "@type": "Question",
      name: "Czy kolejne sprawy będą tańsze?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pierwsze wydanie premium to nasz flagowy produkt z pełnym zestawem gadżetów. Kolejne sprawy będą dostępne w różnych wariantach cenowych — od tańszych zestawów po kolejne edycje premium.",
      },
    },
    {
      "@type": "Question",
      name: "Czy to jest zabawa bez ekranu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak! Wszystkie teczki detektywistyczne to w 100% zabawa bez ekranu. Dziecko pracuje z papierowymi materiałami, szyframi i wskazówkami — bez tabletu, telefonu ani komputera.",
      },
    },
    {
      "@type": "Question",
      name: "Czy trzeba drukować zagadki z Akademii Małego Detektywa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zagadki w wersji PDF wymagają wydruku — to część zabawy. Wydanie premium jest gotowe do zabawy od razu po rozpakowaniu, bez drukarki.",
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
