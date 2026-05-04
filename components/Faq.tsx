"use client";

import { useState } from "react";

const items = [
  {
    question: "Dla jakiego wieku są zagadki Akademii Małego Detektywa?",
    answer:
      "Nasze sprawy przygotowujemy dla dzieci w wieku 8-12 lat. Na stronie i w sklepie dzielimy je na trzy poziomy: 8 lat, 9-10 lat oraz 11-12 lat."
  },
  {
    question: "Czy dziecko może rozwiązać sprawę samodzielnie?",
    answer:
      "Tak, wiele dzieci poradzi sobie samodzielnie, ale młodszym detektywom często sprawia dużą radość wspólne śledztwo z rodzicem lub rodzeństwem."
  },
  {
    question: "Co znajduje się w pierwszym wydaniu premium?",
    answer:
      "Pierwsze wydanie premium zawiera papierową teczkę ze śledztwem oraz dodatki, takie jak latarka UV, notatnik detektywa i akcesoria śledcze."
  },
  {
    question: "Czy kolejne sprawy będą tańsze?",
    answer:
      "Tak. Pierwszy zestaw jest najbardziej rozbudowany, bo zawiera gadżety. Kolejne edycje będą tańsze i skupią się głównie na nowych teczkach z zagadkami."
  },
  {
    question: "Czy to jest zabawa bez ekranu?",
    answer:
      "Tak. Akademia Małego Detektywa została zaprojektowana jako angażująca zabawa offline, która rozwija logiczne myślenie, spostrzegawczość i kreatywność."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="section bg-[#f4e5c8]">
      <div className="container">
        <p className="eyebrow text-center">FAQ</p>
        <h2 className="title mx-auto max-w-3xl text-center text-navy">
          Pytania, które rodzice zadają najczęściej
        </h2>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3">
          {items.map((item, index) => {
            const open = openIndex === index;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[#dfc8a3] bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={open}
                >
                  <span className="text-[0.82rem] font-black uppercase leading-5 text-navy sm:text-base">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-xl font-black text-gold">{open ? "−" : "+"}</span>
                </button>

                {open && (
                  <div className="border-t border-[#efe0c3] px-5 py-4 text-sm leading-6 text-slate-700 sm:px-6">
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
