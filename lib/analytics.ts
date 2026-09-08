export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-TKLJFZ7L";
export const CONSENT_COOKIE_NAME = "amd_cookie_consent";
export const CONSENT_COOKIE_ACCEPTED = `${CONSENT_COOKIE_NAME}=true`;
export const CONSENT_COOKIE_EXPIRES_DAYS = 180;
export const ANALYTICS_NAVIGATION_DELAY_MS = 200;

export type DataLayerValue = string | number | boolean | undefined;

export type AnalyticsInteractionParams = {
  event_category?: DataLayerValue;
  event_label?: DataLayerValue;
  location?: DataLayerValue;
};

export type AmdDataLayerEvent =
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

export function hasAnalyticsConsent() {
  if (typeof document === "undefined") return false;

  return document.cookie.includes(CONSENT_COOKIE_ACCEPTED);
}

export function pushDataLayer(event: AmdDataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function pushConsentUpdate(granted: boolean) {
  const consentState = granted ? "granted" : "denied";
  if (window.__amdLastConsentState === consentState) return;

  window.__amdLastConsentState = consentState;
  pushDataLayer({
    event: "amd_consent_update",
    consent_state: consentState,
  });
}

export function pushPageView(url: string) {
  if (window.__amdLastPageViewUrl === url) return;

  window.__amdLastPageViewUrl = url;
  pushDataLayer({
    event: "amd_page_view",
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function pushAnalyticsEvent(
  eventName: "click_download_puzzle" | "generate_lead",
  params: AnalyticsInteractionParams,
) {
  if (!hasAnalyticsConsent()) return;

  pushDataLayer({
    event: eventName === "generate_lead" ? "amd_generate_lead" : "amd_click_download_puzzle",
    ...params,
  });
}
