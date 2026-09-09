"use client";

export default function CookieSettingsButton() {
  return <button type="button" aria-haspopup="dialog" aria-controls="cookie-consent-panel"
    className="cookie-settings-button"
    onClick={() => window.dispatchEvent(new Event("amd:cookie-settings-open"))}>
    Ustawienia cookies
  </button>;
}
