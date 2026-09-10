import { newArticles } from "./new-articles";

export interface Article {
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  readTime: string;
  image?: { src: string; alt: string; width: number; height: number };
  content?: { type: "heading" | "paragraph"; text: string }[];
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
  ...newArticles,
];
