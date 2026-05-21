"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuję"
      declineButtonText="Odrzuć"
      enableDeclineButton
      cookieName="amd_cookie_consent"
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
      expires={180}
      onAccept={() => {
        window.dispatchEvent(new Event("amd:consent-granted"));
      }}
      onDecline={() => {
        window.dispatchEvent(new Event("amd:consent-denied"));
      }}
    >
      Ta strona wykorzystuje pliki cookies do poprawnego działania,
      analizy ruchu oraz działań marketingowych. Korzystając ze strony,
      akceptujesz używanie cookies.{" "}

      <Link
        href="/polityka-prywatnosci"
        className="underline hover:text-[#d4a63d]"
      >
        Polityka prywatności
      </Link>
    </CookieConsent>
  );
}
