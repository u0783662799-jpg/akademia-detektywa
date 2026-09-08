"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONSENT_COOKIE_EXPIRES_DAYS, CONSENT_COOKIE_NAME } from "@/lib/analytics";

type QaStatus = "idle" | "done" | "unknown-action";

declare global {
  interface Window {
    __amdQaHandledActions?: Set<string>;
  }
}

const cookieMaxAge = CONSENT_COOKIE_EXPIRES_DAYS * 24 * 60 * 60;

function setConsentCookie(value: "true" | "false") {
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
}

function resetConsentCookie() {
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

function dispatchConsentGranted() {
  setConsentCookie("true");
  window.dispatchEvent(new Event("amd:consent-granted"));
}

function dispatchConsentDenied() {
  setConsentCookie("false");
  window.dispatchEvent(new Event("amd:consent-denied"));
}

function dispatchLeadSuccess() {
  window.dispatchEvent(
    new CustomEvent("amd:lead-success", {
      detail: {
        eventName: "generate_lead",
        event_category: "lead",
        event_label: "qa_mailerlite_success",
        location: "analytics_qa",
      },
    }),
  );
}

export default function AnalyticsQaClient() {
  const router = useRouter();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<QaStatus>("idle");
  const [action, setAction] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentAction = params.get("action") || "";
    const key = `${window.location.pathname}${window.location.search}`;

    setAction(currentAction || "none");

    window.__amdQaHandledActions = window.__amdQaHandledActions || new Set<string>();

    const timer = window.setTimeout(() => {
      if (window.__amdQaHandledActions?.has(key)) return;
      window.__amdQaHandledActions?.add(key);

      if (!currentAction || currentAction === "pageview") {
        setStatus("done");
        return;
      }

      if (currentAction === "reset") {
        resetConsentCookie();
        window.__amdLastConsentState = undefined;
        window.__amdLastPageViewUrl = null;
        setStatus("done");
        return;
      }

      if (currentAction === "grant") {
        dispatchConsentGranted();
        setStatus("done");
        return;
      }

      if (currentAction === "deny") {
        dispatchConsentDenied();
        setStatus("done");
        return;
      }

      if (currentAction === "cta") {
        ctaRef.current?.click();
        setStatus("done");
        return;
      }

      if (currentAction === "lead-success") {
        dispatchLeadSuccess();
        setStatus("done");
        return;
      }

      if (currentAction === "failed-submit") {
        formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        setStatus("done");
        return;
      }

      if (currentAction === "spa") {
        router.push(`/__analytics-qa?action=pageview&scenario=spa&nonce=${Date.now()}`);
        setStatus("done");
        return;
      }

      setStatus("unknown-action");
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-cream px-6 py-10 text-navy">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl">Analytics QA</h1>
        <p className="mt-3 text-sm text-navy/70">Temporary GTM Preview harness.</p>
        <dl className="mt-8 grid gap-3 text-sm">
          <div>
            <dt className="font-bold">Action</dt>
            <dd data-qa-action>{action}</dd>
          </div>
          <div>
            <dt className="font-bold">Status</dt>
            <dd data-qa-status>{status}</dd>
          </div>
        </dl>
        <button
          ref={ctaRef}
          type="button"
          className="mt-8 rounded bg-gold px-4 py-2 font-bold text-navy"
          data-analytics-event="click_download_puzzle"
          data-analytics-category="lead"
          data-analytics-label="qa_download_cta"
          data-analytics-location="analytics_qa"
        >
          QA CTA
        </button>
        <form
          ref={formRef}
          className="mt-4"
          data-analytics-success-event="generate_lead"
          data-analytics-category="lead"
          data-analytics-label="qa_failed_submit"
          data-analytics-location="analytics_qa"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input className="rounded border border-navy/20 px-3 py-2" name="email" type="email" />
          <button className="ml-2 rounded bg-navy px-4 py-2 text-cream" type="submit">
            QA Submit
          </button>
        </form>
      </div>
    </main>
  );
}
