"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CONSENT_COOKIE_ACCEPTED, GTM_ID } from "@/lib/analytics";

type DataLayerValue = string | number | boolean | undefined;

type AnalyticsEventDetail = {
  eventName?: string;
  event_category?: string;
  event_label?: string;
  location?: string;
};

type InteractionParams = {
  event_category?: DataLayerValue;
  event_label?: DataLayerValue;
  location?: DataLayerValue;
};

type AmdDataLayerEvent =
  | {
      event: "amd_consent_update";
      consent_state: "granted" | "denied";
    }
  | {
      event: "amd_page_view";
      page_path: string;
      page_location: string;
      page_title: string;
    }
  | {
      event: "amd_click_download_puzzle" | "amd_generate_lead";
      event_category?: DataLayerValue;
      event_label?: DataLayerValue;
      location?: DataLayerValue;
    };

declare global {
  interface Window {
    dataLayer?: AmdDataLayerEvent[];
    __amdLastConsentState?: "granted" | "denied";
    __amdLastPageViewUrl?: string | null;
  }
}

function hasAnalyticsConsent() {
  return document.cookie.includes(CONSENT_COOKIE_ACCEPTED);
}

function pushDataLayer(event: AmdDataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function pushConsentUpdate(granted: boolean) {
  const consentState = granted ? "granted" : "denied";
  if (window.__amdLastConsentState === consentState) return;

  window.__amdLastConsentState = consentState;
  pushDataLayer({
    event: "amd_consent_update",
    consent_state: consentState,
  });
}

function pushPageView(url: string) {
  if (window.__amdLastPageViewUrl === url) return;

  window.__amdLastPageViewUrl = url;
  pushDataLayer({
    event: "amd_page_view",
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function pushAnalyticsEvent(
  eventName: "click_download_puzzle" | "generate_lead",
  params: InteractionParams,
) {
  if (!hasAnalyticsConsent()) return;

  pushDataLayer({
    event: eventName === "generate_lead" ? "amd_generate_lead" : "amd_click_download_puzzle",
    ...params,
  });
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consentGrantedRef = useRef(false);
  const lastPageViewUrlRef = useRef<string | null>(null);

  const sendTrackedPageView = () => {
    if (!consentGrantedRef.current) return;

    const url = `${window.location.pathname}${window.location.search}`;
    if (lastPageViewUrlRef.current === url) return;

    lastPageViewUrlRef.current = url;
    pushPageView(url);
  };

  useEffect(() => {
    if (!GTM_ID || typeof window === "undefined") return;

    const grant = () => {
      consentGrantedRef.current = true;
      pushConsentUpdate(true);
      sendTrackedPageView();
    };

    const deny = () => {
      consentGrantedRef.current = false;
      lastPageViewUrlRef.current = null;
      window.__amdLastPageViewUrl = null;
      pushConsentUpdate(false);
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const trackedElement = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trackedElement) return;
      if (trackedElement.dataset.analyticsEvent !== "click_download_puzzle") return;

      pushAnalyticsEvent("click_download_puzzle", {
        event_category: trackedElement.dataset.analyticsCategory,
        event_label: trackedElement.dataset.analyticsLabel,
        location: trackedElement.dataset.analyticsLocation,
      });
    };

    const handleLeadSuccess = (event: Event) => {
      const detail = (event as CustomEvent<AnalyticsEventDetail>).detail || {};

      pushAnalyticsEvent("generate_lead", {
        event_category: detail.event_category || "lead",
        event_label: detail.event_label,
        location: detail.location,
      });
    };

    window.addEventListener("amd:consent-granted", grant);
    window.addEventListener("amd:consent-denied", deny);
    window.addEventListener("amd:lead-success", handleLeadSuccess);
    document.addEventListener("click", handleClick);

    if (hasAnalyticsConsent()) {
      consentGrantedRef.current = true;
      pushConsentUpdate(true);
    }

    return () => {
      window.removeEventListener("amd:consent-granted", grant);
      window.removeEventListener("amd:consent-denied", deny);
      window.removeEventListener("amd:lead-success", handleLeadSuccess);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!GTM_ID || typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;

    consentGrantedRef.current = true;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (lastPageViewUrlRef.current === url) return;

    lastPageViewUrlRef.current = url;
    pushPageView(url);
  }, [pathname, searchParams]);

  return null;
}
