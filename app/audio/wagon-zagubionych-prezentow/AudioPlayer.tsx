"use client";

import { useRef, useState } from "react";
import { LoaderCircle, Pause, Play, RotateCcw } from "lucide-react";
import styles from "./page.module.css";

const source = "/audio/wagon-zagubionych-prezentow/wprowadzenie.mp3";
const bars = [18, 35, 60, 42, 78, 50, 94, 65, 100, 74, 46, 86, 58, 38, 68, 48, 30, 54, 26, 40, 20];
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

export default function AudioPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState(false);

  async function toggle() {
    const media = audio.current;
    if (!media) return;
    if (!media.paused) { media.pause(); return; }
    setError(false);
    setWaiting(true);
    if (media.error) media.load();
    if (media.ended) media.currentTime = 0;
    try { await media.play(); }
    catch { setError(true); setWaiting(false); }
  }

  const label = playing ? "Wstrzymaj wiadomość" : ended ? "Odtwórz ponownie" : "Odtwórz wiadomość";
  return (
    <div className={styles.controls}>
      <audio ref={audio} src={source} preload="metadata"
        onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
        onPlaying={() => { setPlaying(true); setWaiting(false); setEnded(false); }}
        onPause={() => { setPlaying(false); setWaiting(false); }}
        onWaiting={() => setWaiting(true)}
        onEnded={() => { setEnded(true); setPlaying(false); setWaiting(false); }}
        onError={() => { setError(true); setWaiting(false); setPlaying(false); }}
      />
      <button type="button" onClick={toggle} className={styles.playButton} aria-label={label} title={label} aria-busy={waiting}>
        {waiting ? <LoaderCircle className={styles.spinner} /> : playing ? <Pause fill="currentColor" /> : ended ? <RotateCcw /> : <Play fill="currentColor" />}
      </button>
      <div className={styles.track}>
        <div className={`${styles.wave} ${playing && !waiting ? styles.moving : ""}`} aria-hidden="true">
          {bars.map((height, index) => <span key={index} style={{ height: `${height}%`, animationDelay: `${index * -0.13}s` }} />)}
        </div>
        <div className={styles.timeline}>
          <span>{clock(time)}</span>
          <input type="range" min={0} max={duration || 1} step={0.1} value={Math.min(time, duration || 1)} disabled={!duration}
            aria-label="Pozycja nagrania" aria-valuetext={`${clock(time)} z ${clock(duration)}`}
            onChange={event => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setTime(value); }} />
          <span>{clock(duration)}</span>
        </div>
      </div>
      {error && <p role="alert" className={styles.error}>Nie udało się odtworzyć. <a href={source}>Otwórz MP3</a></p>}
      <noscript><a href={source}>Otwórz wiadomość MP3</a></noscript>
    </div>
  );
}
