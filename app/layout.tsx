import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin-ext"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Akademia Małego Detektywa | Zagadki dla dzieci 8-12 lat",
  description:
    "Gotowe papierowe zagadki detektywistyczne dla dzieci. Pobierz darmową sprawę PDF i poznaj Akademię Małego Detektywa.",
  keywords: [
    "zagadki dla dzieci",
    "detektywistyczne zagadki",
    "teczka detektywa",
    "zabawa bez ekranu",
    "gry dla dzieci 8-12 lat",
    "Akademia Małego Detektywa"
  ],
  authors: [{ name: "Akademia Małego Detektywa" }],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Akademia Małego Detektywa | Zagadki dla dzieci 8-12 lat",
    description:
      "Detektywistyczne teczki, szyfry i zagadki dla dzieci 8-12 lat. Darmowy PDF i papierowe sprawy premium.",
    type: "website",
    locale: "pl_PL"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akademia Małego Detektywa",
    description:
      "Papierowe zagadki detektywistyczne i sprawy premium dla dzieci 8-12 lat."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${archivo.variable} bg-cream font-sans text-ink`}>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V817XGHG8Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V817XGHG8Q');
          `}
        </Script>

        {/* MailerLite script */}
        <Script
          src="https://groot.mailerlite.com/js/w/webforms.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}