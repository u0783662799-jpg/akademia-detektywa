"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import {
  ANALYTICS_NAVIGATION_DELAY_MS,
  hasAnalyticsConsent,
  pushAnalyticsEvent,
} from "@/lib/analytics";

type AnalyticsLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  analyticsCategory?: string;
  analyticsLabel?: string;
  analyticsLocation?: string;
  analyticsDelayMs?: number;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function shouldUseNativeNavigation(event: MouseEvent<HTMLAnchorElement>, target?: string) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    (target !== undefined && target !== "" && target !== "_self")
  );
}

export default function AnalyticsLink({
  href,
  children,
  analyticsCategory,
  analyticsLabel,
  analyticsLocation,
  analyticsDelayMs = ANALYTICS_NAVIGATION_DELAY_MS,
  onClick,
  target,
  ...props
}: AnalyticsLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (shouldUseNativeNavigation(event, target)) return;
    if (!hasAnalyticsConsent()) return;

    event.preventDefault();
    event.stopPropagation();

    pushAnalyticsEvent("click_download_puzzle", {
      event_category: analyticsCategory,
      event_label: analyticsLabel,
      location: analyticsLocation,
    });

    window.setTimeout(() => {
      router.push(href);
    }, analyticsDelayMs);
  };

  return (
    <Link
      {...props}
      href={href}
      target={target}
      data-analytics-event="click_download_puzzle"
      data-analytics-category={analyticsCategory}
      data-analytics-label={analyticsLabel}
      data-analytics-location={analyticsLocation}
      data-analytics-managed-navigation="true"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
