const items = ["Teczka z zagadką", "Latarka UV", "Notatnik detektywa", "Akcesoria śledcze"];

export default function ProductHighlight() {
  return (
    <section id="sklep" className="section detective-bg text-white">
      <div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12">
        <div>
          <p className="eyebrow">Pierwsze wydanie premium</p>
          <h2 className="title">Zamów sprawę nr 1 i zgarnij gadżety detektywa</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
            To najbardziej rozbudowany zestaw w całej serii. Dziecko dostaje nie tylko teczkę ze
            śledztwem, ale też dodatki, które od razu budują klimat prawdziwej misji detektywistycznej.
          </p>
          <ul className="mt-6 grid gap-2 text-sm sm:mt-7 sm:gap-3 sm:text-base">
            {items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="font-black text-gold">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <div className="rounded-2xl bg-gold p-5 text-navy shadow-soft">
              <p className="font-display text-xl uppercase leading-tight">Wydanie premium</p>
              <p className="mt-3 text-sm font-bold leading-6">
                Najlepszy wybór dla pierwszego kontaktu z Akademią Małego Detektywa.
              </p>
            </div>
          </div>

          <div className="mt-7 flex justify-center sm:mt-8">
            <a className="btn" href="/sklep">Zobacz w sklepie</a>
          </div>
        </div>

        <div id="nowosci" className="order-first grid gap-5 lg:order-none lg:grid-cols-1 lg:items-start">
          <div className="rounded-[2rem] border border-gold/20 bg-white/8 p-3 shadow-soft backdrop-blur sm:p-5">
            <div className="rounded-[1.5rem] bg-[#071829] p-2 sm:p-4">
              <img
                src="/okladka1.png"
                alt="Okładka pierwszego wydania premium"
                className="mx-auto block h-auto w-full max-w-[320px] rounded-[1.25rem] object-contain shadow-soft sm:max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
