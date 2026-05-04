const benefits = [
  {
    title: "Rozwija logikę",
    text: "i sposób myślenia",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6">
        <path
          d="M9 4.5a4.5 4.5 0 0 0-3.1 7.77c.4.39.63.92.63 1.48V15a1 1 0 0 0 1 1H10v1H8.5a1 1 0 0 0 0 2H10v.5a1.5 1.5 0 0 0 3 0V19h1.5a1 1 0 1 0 0-2H13v-1h2.47a1 1 0 0 0 1-1v-1.25c0-.56.23-1.1.64-1.48A4.5 4.5 0 1 0 9 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10.5 9.5h3M12 8v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Zabawa w domu",
    text: "gotowa od razu",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6">
        <circle cx="10" cy="10" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14.5 14.5 19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 10h4M10 8v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Dla dzieci",
    text: "8-12 lat",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6">
        <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4.5 18c.5-2.5 2.2-4 3.5-4h0c1.3 0 3 1.5 3.5 4M12.5 18c.5-2.5 2.2-4 3.5-4h0c1.3 0 3 1.5 3.5 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    title: "Bez ekranu",
    text: "edukacyjnie",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6">
        <rect x="5" y="6" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 4.5 20.5 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function BenefitsStrip() {
  return (
    <section className="hidden border-y border-[#e4cfaa] bg-cream md:block">
      <div className="container grid divide-y divide-[#e4cfaa] md:grid-cols-4 md:divide-x md:divide-y-0">
        {benefits.map((item) => (
          <article key={item.title} className="flex items-center gap-3 py-4 md:justify-center md:gap-4 md:py-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-navy/20 bg-white text-navy md:h-12 md:w-12">
              {item.icon}
            </span>
            <div>
              <h3 className="text-sm font-black uppercase text-navy md:text-base">{item.title}</h3>
              <p className="text-[0.72rem] font-bold uppercase text-slate-600 md:text-sm">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
