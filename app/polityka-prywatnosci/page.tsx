import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności Akademii Małego Detektywa: informacje o przetwarzaniu danych, newsletterze, cookies i kontakcie.",
  alternates: {
    canonical: `${SITE_URL}/polityka-prywatnosci`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="font-display text-4xl md:text-5xl text-navy mb-10">
          Polityka prywatności
        </h1>

        <div className="space-y-10 text-navy/80 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              1. Informacje ogólne
            </h2>

            <p>
              Administratorem danych osobowych jest Michał Makowski,
              prowadzący serwis Akademia Małego Detektywa dostępny pod adresem
              malydetektyw.pl.
            </p>

            <p className="mt-4">
              Kontakt z administratorem:
              <br />
              Michał Makowski
              <br />
              ul. Okulickiego 54/9
              <br />
              66-400 Gorzów Wielkopolski
              <br />
              e-mail: pomoc@malydetektyw.pl
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              2. Jakie dane zbieramy
            </h2>

            <p>
              Podczas korzystania ze strony możemy zbierać:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>adres e-mail podany w formularzu newslettera,</li>
              <li>dane statystyczne dotyczące odwiedzin strony,</li>
              <li>informacje zapisywane w plikach cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              3. Cel przetwarzania danych
            </h2>

            <p>
              Dane osobowe przetwarzane są w celu:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>wysyłki darmowych materiałów PDF,</li>
              <li>prowadzenia newslettera,</li>
              <li>informowania o nowych produktach i premierach,</li>
              <li>analizy ruchu na stronie internetowej,</li>
              <li>prowadzenia działań marketingowych.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              4. Newsletter i MailerLite
            </h2>

            <p>
              Do obsługi newslettera wykorzystywany jest system MailerLite.
              Podanie adresu e-mail jest dobrowolne, ale niezbędne do otrzymania
              darmowych materiałów oraz wiadomości e-mail.
            </p>

            <p className="mt-4">
              Użytkownik może w każdej chwili wypisać się z newslettera,
              klikając odpowiedni link znajdujący się w każdej wiadomości.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              5. Google Analytics
            </h2>

            <p>
              Strona korzysta z Google Analytics w celu analizy ruchu
              i poprawy działania serwisu.
            </p>

            <p className="mt-4">
              Google Analytics może zapisywać anonimowe informacje dotyczące
              sposobu korzystania ze strony, takie jak czas wizyty,
              typ urządzenia lub źródło wejścia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              6. Meta Pixel i działania reklamowe
            </h2>

            <p>
              W przyszłości strona może korzystać z narzędzi reklamowych Meta
              (Facebook i Instagram), w tym Meta Pixel, w celu prowadzenia
              kampanii reklamowych i remarketingu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              7. Pliki cookies
            </h2>

            <p>
              Strona wykorzystuje pliki cookies w celu prawidłowego działania,
              analizy ruchu oraz działań marketingowych.
            </p>

            <p className="mt-4">
              Użytkownik może zarządzać plikami cookies z poziomu swojej
              przeglądarki internetowej.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              8. Hosting
            </h2>

            <p>
              Strona jest hostowana z wykorzystaniem usług Vercel oraz OVH.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              9. Prawa użytkownika
            </h2>

            <p>
              Każda osoba, której dane dotyczą, ma prawo do:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>dostępu do swoich danych,</li>
              <li>poprawiania danych,</li>
              <li>usunięcia danych,</li>
              <li>ograniczenia przetwarzania danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania danych.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">
              10. Kontakt
            </h2>

            <p>
              W sprawach związanych z przetwarzaniem danych osobowych można
              kontaktować się pod adresem:
            </p>

            <p className="mt-4 font-semibold">
              pomoc@malydetektyw.pl
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
