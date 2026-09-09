"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  clearQueuedNavigationCtaEvent,
  GTM_ID,
  flushQueuedNavigationCtaEvent,
  hasAnalyticsConsent,
  pushAnalyticsEvent,
  pushConsentUpdate,
  pushPageView,
} from "@/lib/analytics";
import { removeAnalyticsCookies } from "@/lib/analytics-cookies";

type AnalyticsEventDetail = {
  eventName?: string;
  event_category?: string;
  event_label?: string;
  location?: string;
  form_id?: string;
  lead_type?: "free_puzzle";
};

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
      clearQueuedNavigationCtaEvent();
      removeAnalyticsCookies();
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const trackedElement = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trackedElement) return;
      if (trackedElement.dataset.analyticsManagedNavigation === "true") return;
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
        form_id: detail.form_id,
        lead_type: detail.lead_type,
      });
    };

    window.addEventListener("amd:consent-granted", grant);
    window.addEventListener("amd:consent-denied", deny);
    window.addEventListener("amd:lead-success", handleLeadSuccess);
    document.addEventListener("click", handleClick);

    if (hasAnalyticsConsent()) {
      consentGrantedRef.current = true;
      pushConsentUpdate(true);
    } else {
      clearQueuedNavigationCtaEvent();
      if (document.cookie.split(";").some(cookie => cookie.trim() === "amd_cookie_consent=false")) deny();
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
    flushQueuedNavigationCtaEvent();

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (lastPageViewUrlRef.current === url) return;

    lastPageViewUrlRef.current = url;
    pushPageView(url);
  }, [pathname, searchParams]);

  return null;
}
