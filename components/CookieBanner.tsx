"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CONSENT_COOKIE_EXPIRES_DAYS, CONSENT_COOKIE_NAME } from "@/lib/analytics";

export default function CookieBanner() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const close = () => {
    setSettingsOpen(false);
    if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
    returnFocus.current = null;
  };
  useEffect(() => {
    const open = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setSettingsOpen(true);
    };
    window.addEventListener("amd:cookie-settings-open", open);
    return () => window.removeEventListener("amd:cookie-settings-open", open);
  }, []);
  useEffect(() => { if (settingsOpen) closeButton.current?.focus(); }, [settingsOpen]);
  return (
    <CookieConsent
      visible={settingsOpen ? "show" : "byCookieValue"}
      customContainerAttributes={{
        id: "cookie-consent-panel", role: "dialog", "aria-label": "Ustawienia cookies",
        onKeyDown: (event: React.KeyboardEvent) => {
          if (settingsOpen && event.key === "Escape") { event.preventDefault(); close(); }
        },
      }}
      location="bottom"
      buttonText="Akceptuję"
      declineButtonText="Odrzuć"
      enableDeclineButton
      cookieName={CONSENT_COOKIE_NAME}
      style={{
        background: "#061928",
        color: "#f8f3e7",
        padding: "18px",
        fontSize: "14px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      buttonStyle={{
        background: "#d4a63d",
        color: "#061928",
        borderRadius: "999px",
        padding: "10px 18px",
        fontWeight: "700",
        border: "none",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#f8f3e7",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "999px",
        padding: "10px 18px",
        fontWeight: "600",
      }}
      expires={CONSENT_COOKIE_EXPIRES_DAYS}
      onAccept={() => {
        window.dispatchEvent(new Event("amd:consent-granted"));
        close();
      }}
      onDecline={() => {
        window.dispatchEvent(new Event("amd:consent-denied"));
        close();
      }}
    >
      {settingsOpen && <button ref={closeButton} type="button" onClick={close}
        aria-label="Zamknij ustawienia cookies" title="Zamknij ustawienia cookies"
        className="cookie-settings-close"><X size={20} aria-hidden="true" /></button>}
      Używamy niezbędnych plików cookies. Za Twoją zgodą zapisujemy również
      cookies analityczne Google Analytics, które pomagają nam ulepszać stronę.
      Możesz zaakceptować lub odrzucić cookies analityczne.
      Twój wybór zapamiętamy na 180 dni.{" "}

      <Link
        href="/polityka-prywatnosci"
        className="underline hover:text-[#d4a63d]"
      >
        Polityka prywatności
      </Link>
    </CookieConsent>
  );
}
