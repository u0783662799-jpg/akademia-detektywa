interface Article {
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  readTime: string;
  image?: { src: string; alt: string; width: number; height: number };
}

export const articles: Article[] = [
  {
    slug: "gry-logiczne-zagadki-detektywistyczne-rozwoj-dziecka",
    title: "Jak gry logiczne i zagadki detektywistyczne wpływają na rozwój dziecka?",
    desc: "Koncentracja, samodzielność, spostrzegawczość i wspólny czas bez ekranu. Sprawdź, co dziecko może ćwiczyć podczas rozwiązywania detektywistycznej sprawy.",
    category: "Rozwój przez zabawę",
    date: "2026-09-10",
    readTime: "6 min",
    image: {
      src: "/blog/rozwoj-dziecka/hero.png",
      alt: "Dziecko z lupą rozwiązuje zagadkę przy stole, a mama towarzyszy mu w zabawie",
      width: 1672,
      height: 941,
    },
  },
  {
    slug: "zagadki-logiczne-dla-dzieci-8-lat",
    title: "Zagadki logiczne dla dzieci 8 lat - 5 łatwych przykładów z rozwiązaniami",
    desc: "Gotowe zagadki logiczne dla ośmiolatków z rozwiązaniami. Idealne na pierwsze ćwiczenia myślenia dedukcyjnego.",
    category: "Zagadki",
    date: "2026-04-10",
    readTime: "5 min",
  },
  {
    slug: "zabawa-bez-ekranu-dla-dzieci",
    title: "Zabawa bez ekranu dla dzieci - 8 pomysłów na weekend",
    desc: "Sprawdzone sposoby na oderwanie dziecka od tabletu. Aktywna, kreatywna zabawa w domu i na podwórku.",
    category: "Inspiracje",
    date: "2026-04-15",
    readTime: "6 min",
  },
  {
    slug: "prezent-dla-dziecka-10-lat",
    title: "Prezent dla dziecka 10 lat - co kupić zamiast kolejnej zabawki?",
    desc: "Ranking prezentów, które rozwijają i angażują 10-latka. Bez baterii, bez ekranu, z gwarancją uśmiechu.",
    category: "Poradniki",
    date: "2026-04-20",
    readTime: "7 min",
  },
  {
    slug: "jak-oderwac-dziecko-od-tabletu",
    title: "Jak oderwać dziecko od tabletu? 8 sprawdzonych sposobów rodziców",
    desc: "Praktyczne strategie, które działają: jak ograniczyć ekrany i zaangażować dziecko w aktywną zabawę.",
    category: "Poradniki",
    date: "2026-05-12",
    readTime: "6 min",
  },
];
