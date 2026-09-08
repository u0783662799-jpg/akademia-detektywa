"use client";

import { useEffect, useRef } from "react";
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

type AnalyticsEventDetail = {
  eventName?: string;
  event_category?: string;
  event_label?: string;
  location?: string;
};

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
  const consentGrantedRef = useRef(false);
  const lastPageViewUrlRef = useRef<string | null>(null);

  const sendTrackedPageView = () => {
    if (!consentGrantedRef.current) return;

    const url = `${window.location.pathname}${window.location.search}`;
    if (lastPageViewUrlRef.current === url) return;

    lastPageViewUrlRef.current = url;
    sendPageView(url);
  };

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    const grant = () => {
      consentGrantedRef.current = true;
      updateConsent(true);
      sendTrackedPageView();
    };

    const deny = () => {
      consentGrantedRef.current = false;
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

    const handleLeadSuccess = (event: Event) => {
      const detail = (event as CustomEvent<AnalyticsEventDetail>).detail || {};

      sendEvent(detail.eventName || "generate_lead", {
        event_category: detail.event_category,
        event_label: detail.event_label,
        location: detail.location,
      });
    };

    window.addEventListener("amd:consent-granted", grant);
    window.addEventListener("amd:consent-denied", deny);
    window.addEventListener("amd:lead-success", handleLeadSuccess);
    document.addEventListener("click", handleClick);

    if (document.cookie.includes(CONSENT_COOKIE)) {
      consentGrantedRef.current = true;
      updateConsent(true);
    } else {
      deny();
    }

    return () => {
      window.removeEventListener("amd:consent-granted", grant);
      window.removeEventListener("amd:consent-denied", deny);
      window.removeEventListener("amd:lead-success", handleLeadSuccess);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
    if (!document.cookie.includes(CONSENT_COOKIE)) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (lastPageViewUrlRef.current === url) return;

    lastPageViewUrlRef.current = url;
    sendPageView(url);
  }, [pathname, searchParams]);

  return null;
}
