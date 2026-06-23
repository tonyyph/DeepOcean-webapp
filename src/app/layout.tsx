import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Deep Ocean",
  title: "Deep Ocean — Turn Focus Into a Dive",
  description:
    "Deep Ocean is a focus app where timed or open-ended dive sessions become depth, discoveries, progress, expedition history, and calm personal guidance.",
  keywords: [
    "focus app",
    "focus timer",
    "ocean meditation",
    "deep focus",
    "deep work",
    "productivity",
    "AI companion",
    "dive session",
    "ocean",
    "pomodoro",
    "habit tracker",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Deep Ocean — Turn Focus Into a Dive",
    description:
      "Focus deeper, surface calmer with real dive sessions, ocean progression, discoveries, local history, and optional AI guidance.",
    url: "/",
    siteName: "Deep Ocean",
    type: "website",
    images: [
      {
        url: "/assets/ocean-portal-wide.png",
        width: 1000,
        height: 500,
        alt: "Deep Ocean focus app underwater portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Ocean — Turn Focus Into a Dive",
    description:
      "A focus app with ocean dive sessions, discoveries, local progress, and optional personal guidance.",
    images: ["/assets/ocean-portal-wide.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
