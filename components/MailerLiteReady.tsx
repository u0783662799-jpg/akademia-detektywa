"use client";

import { useEffect, useRef, useState } from "react";

// Readiness includes the provider's submit handler, not just its script download.
type MailerLiteWindow = Window & {
  ml_jQuery?: { _data?: (element: Element, key: string) => { submit?: unknown[] } };
  ml_webform_success_40808156_dark?: () => void;
  ml_webform_success_40808156_light?: () => void;
};

export default function MailerLiteReady() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) return;
    const button = form.querySelector<HTMLButtonElement>("button.primary");
    const started = Date.now();
    let ready = false;
    const guard = (event: Event) => {
      if (ready) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    form.addEventListener("submit", guard, true);
    const check = () => {
      const client = window as MailerLiteWindow;
      ready = Boolean(client.ml_jQuery?._data?.(form, "events")?.submit?.length &&
        client.ml_webform_success_40808156_dark && client.ml_webform_success_40808156_light);
      if (button) button.disabled = !ready;
      setState(ready ? "ready" : Date.now() - started >= 15000 ? "failed" : "loading");
      if (ready) window.clearInterval(timer);
    };
    const timer = window.setInterval(check, 250);
    check();
    return () => {
      window.clearInterval(timer);
      form.removeEventListener("submit", guard, true);
    };
  }, []);

  return <p ref={ref} role="status" className="text-sm mb-3">
    {state === "loading" ? "Ładowanie formularza..." : state === "failed"
      ? "Nie udało się załadować formularza. Sprawdź połączenie i odśwież stronę."
      : ""}
  </p>;
}
