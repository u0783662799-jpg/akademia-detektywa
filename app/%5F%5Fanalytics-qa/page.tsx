import { Suspense } from "react";
import AnalyticsQaClient from "./AnalyticsQaClient";

export const metadata = {
  title: "Analytics QA | FOX",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsQaPage() {
  return (
    <Suspense fallback={null}>
      <AnalyticsQaClient />
    </Suspense>
  );
}
