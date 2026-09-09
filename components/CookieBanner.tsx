"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { CONSENT_COOKIE_EXPIRES_DAYS, CONSENT_COOKIE_NAME } from "@/lib/analytics";

export default function CookieBanner() {
  return (
    <CookieConsent
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
      }}
      onDecline={() => {
        window.dispatchEvent(new Event("amd:consent-denied"));
      }}
    >
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
