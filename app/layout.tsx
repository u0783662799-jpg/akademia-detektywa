import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { DEFAULT_META, SITE_URL, schemaOrganization, schemaWebSite } from "@/lib/seo";
import { GTM_ID } from "@/lib/analytics";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META.title,
    template: "%s | Akademia Małego Detektywa",
  },
  description: DEFAULT_META.description,
  keywords: DEFAULT_META.keywords,
  authors: [{ name: "Akademia Małego Detektywa" }],
  creator: "Akademia Małego Detektywa",
  publisher: "Akademia Małego Detektywa",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "pl-PL": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Akademia Małego Detektywa",
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Akademia Małego Detektywa – zagadki detektywistyczne dla dzieci 8–12 lat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@malydetektyw",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
      </head>

      <body className="font-sans antialiased bg-cream text-navy">
        {GTM_ID ? (
          <>
            <Script id="gtm-loader" strategy="beforeInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </>
        ) : null}

        {children}

        <CookieBanner />
      </body>
    </html>
  );
}
