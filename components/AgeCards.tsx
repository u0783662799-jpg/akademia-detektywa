import { DETECTIVE_LEVELS } from "@/lib/character";

const colors = [
  { color: "text-green-700", button: "bg-green-700" },
  { color: "text-sky-800", button: "bg-sky-800" },
  { color: "text-violet-800", button: "bg-violet-800" },
];
const ages = DETECTIVE_LEVELS.map((item, index) => ({ ...item, ...colors[index] }));

export default function AgeCards() {
  return (
    <section id="wiek" className="section paper-bg">
      <div className="container">
        <p className="eyebrow text-center">Wybierz poziom</p>
        <h2 className="title text-center text-navy">Zagadki dopasowane do wieku</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {ages.map((item) => (
            <article
              key={item.age}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-[#e3ccaa] bg-white/90 p-5 shadow-soft transition hover:-translate-y-1 sm:min-h-[250px] sm:p-6"
            >
              <div className="relative z-10 max-w-[56%] sm:max-w-[62%]">
                <span className="rounded-full bg-cream px-3 py-1 text-[0.65rem] font-black uppercase text-navy sm:text-xs">
                  {item.stage}
                </span>
                <p className={`mt-3 font-display text-[2rem] uppercase leading-none sm:mt-4 sm:text-4xl ${item.color}`}>{item.age}</p>
                <h3 className="mt-2 text-sm font-black uppercase leading-5 text-navy sm:text-base">{item.name}</h3>
                <p className="mt-2 text-[0.82rem] leading-5 text-slate-700 sm:mt-3 sm:text-sm sm:leading-6">{item.copy}</p>
                <p className="mt-2 text-[0.72rem] font-black uppercase text-slate-500 sm:mt-3 sm:text-sm">Poziom: {item.level}</p>
                <button className={`mt-4 rounded-lg px-4 py-2.5 text-[0.7rem] font-black uppercase text-white sm:mt-5 sm:px-5 sm:py-3 sm:text-xs ${item.button}`}>
                  Sprawdź
                </button>
              </div>

              <div className="absolute bottom-0 right-1 z-0 flex h-40 w-32 items-end justify-center transition group-hover:scale-105 sm:right-2 sm:h-48 sm:w-36">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-full w-auto max-w-full object-contain object-bottom"
                />
              </div>
              <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-orange/15 sm:-bottom-14 sm:-right-10 sm:h-48 sm:w-48" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
