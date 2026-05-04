export default function Hero() {
  return (
    <section id="home" className="hero-full relative overflow-hidden text-white">
      <img
        src="/detektyw.png"
        alt="FOX i teczka sledcza"
        className="absolute inset-0 h-full w-full object-cover object-[66%_top] sm:object-[68%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,31,0.36)_0%,rgba(4,18,31,0.08)_24%,rgba(4,18,31,0.22)_52%,rgba(4,18,31,0.84)_100%)] sm:bg-[linear-gradient(90deg,rgba(4,18,31,0.72)_0%,rgba(4,18,31,0.52)_28%,rgba(4,18,31,0.14)_50%,rgba(4,18,31,0)_68%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,31,0.86)_0%,rgba(4,18,31,0.54)_40%,rgba(4,18,31,0.06)_74%)] sm:hidden" />

      <div className="container relative z-10 flex min-h-[650px] items-start py-5 sm:min-h-[660px] sm:items-center sm:py-12">
        <div className="max-w-[17.5rem] sm:max-w-[31rem] lg:max-w-[38rem]">
          <div className="mb-4 inline-flex rounded-full border border-gold/35 bg-white/8 px-3 py-2 text-[0.62rem] font-black uppercase text-gold backdrop-blur-sm sm:mb-5 sm:px-4 sm:text-xs">
            Nowa seria spraw dla dzieci 8-12 lat
          </div>
          <h1 className="max-w-3xl font-display text-[2.2rem] uppercase leading-[0.94] sm:text-5xl lg:text-[4.7rem]">
            Rozwiązuj zagadki. <span className="text-gold">Trenuj spryt.</span> Zostań Detektywem!
          </h1>
          <p className="mt-4 max-w-[18rem] text-[0.95rem] leading-6 text-white/84 sm:mt-5 sm:max-w-[33rem] sm:text-[1.02rem] sm:leading-7">
            Gotowe papierowe teczki ze śledztwem, szyframi i wskazówkami. Każda sprawa zamienia
            pokój dziecka w małe biuro detektywa i daje świetną zabawę bez ekranu.
          </p>
          <div className="mt-6 hidden flex-col gap-3 sm:mt-7 sm:flex sm:flex-row">
            {/* ✅ TU BYŁ BŁĄD – POPRAWIONE NA #kontakt */}
            <a className="btn" href="#kontakt">Pobierz darmową zagadkę</a>

            <a className="dark-btn border border-white/15 bg-white/10 backdrop-blur-sm" href="/sklep">
              Zobacz sklep
            </a>
          </div>
        </div>
      </div>

      <div className="container relative z-10 pb-5 sm:hidden">
        <div className="mx-auto max-w-[20rem] rounded-2xl border border-gold/30 bg-[#071829]/96 p-4 shadow-soft">
          <div className="grid grid-cols-[52px_1fr] gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-white/20 bg-white/5 font-display text-lg text-white">
              PDF
            </div>
            <div>
              <p className="text-sm font-black uppercase text-gold">Pobierz darmową zagadkę!</p>
              <p className="mt-2 text-[0.8rem] leading-5 text-white/75">
                Odbierz bezpłatną teczkę PDF i sprawdź, czy Twoje dziecko pokocha śledztwa z FOX-em.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <a className="btn w-full" href="#kontakt">Pobierz za darmo</a>
            <a className="dark-btn w-full border border-white/15 bg-white/10 backdrop-blur-sm" href="/sklep">
              Zobacz sklep
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}