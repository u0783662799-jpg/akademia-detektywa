import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import AudioPlayer from "./AudioPlayer";

export const metadata: Metadata = {
  title: "Tajna wiadomość od Detektywa Iwo",
  description: "Posłuchaj wprowadzenia do sprawy: Wagon zagubionych prezentów.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/audio/wagon-zagubionych-prezentow" },
};

export default function PuzzleAudioPage() {
  return (
    <main id="main-content" className={styles.page}>
      <h1 className="sr-only">Tajna wiadomość od Detektywa Iwo - Wagon zagubionych prezentów</h1>
      <div className={styles.poster}>
        <Image
          src="/audio/wagon-zagubionych-prezentow/okladka.png"
          alt="Detektyw Iwo na dworcu kolejowym. Wagon zagubionych prezentów."
          width={941}
          height={1672}
          sizes="(max-width: 560px) 100vw, 560px"
          priority
          className={styles.art}
        />
        <div className={styles.player}>
          <AudioPlayer />
        </div>
      </div>
      <a className={styles.home} href="/">Akademia Małego Detektywa</a>
    </main>
  );
}
