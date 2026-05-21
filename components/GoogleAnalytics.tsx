"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-V817XGHG8Q";
const CONSENT_COOKIE = "amd_cookie_consent=true";

function updateConsent(granted: boolean) {
  if (!window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function sendPageView(url: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function sendEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  if (!document.cookie.includes(CONSENT_COOKIE)) return;

  window.gtag("event", eventName, params);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    const grant = () => {
      updateConsent(true);
      sendPageView(`${window.location.pathname}${window.location.search}`);
    };

    const deny = () => {
      updateConsent(false);
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const trackedElement = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trackedElement) return;

      sendEvent(trackedElement.dataset.analyticsEvent || "click", {
        event_category: trackedElement.dataset.analyticsCategory,
        event_label: trackedElement.dataset.analyticsLabel,
        location: trackedElement.dataset.analyticsLocation,
      });
    };

    const handleSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement | null;
      if (!target) return;
      const eventName = target.dataset.analyticsSubmitEvent;
      if (!eventName) return;

      sendEvent(eventName, {
        event_category: target.dataset.analyticsCategory,
        event_label: target.dataset.analyticsLabel,
        location: target.dataset.analyticsLocation,
      });
    };

    window.addEventListener("amd:consent-granted", grant);
    window.addEventListener("amd:consent-denied", deny);
    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    if (document.cookie.includes(CONSENT_COOKIE)) {
      grant();
    } else {
      deny();
    }

    return () => {
      window.removeEventListener("amd:consent-granted", grant);
      window.removeEventListener("amd:consent-denied", deny);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
    if (!document.cookie.includes(CONSENT_COOKIE)) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    sendPageView(url);
  }, [pathname, searchParams]);

  return null;
}
