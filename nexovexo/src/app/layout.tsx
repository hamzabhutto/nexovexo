import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Expressive geometric display font for headings.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Clean, highly readable body font.
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const SITE_URL = "https://www.nexovexo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexoVexo — AI-Aware DevSecOps, Cloud, AI & Automation Software House",
    template: "%s | NexoVexo",
  },
  description:
    "NexoVexo is a software house specializing in AI-aware DevSecOps, AI-assisted operations, secure AI-agent operations, MCP integrations, and custom software — web, mobile, cloud and automation.",
  keywords: [
    "software house",
    "AI DevSecOps",
    "AI-assisted operations",
    "AI agent security",
    "MCP servers",
    "custom software development",
    "cloud and DevOps",
    "AI automation",
    "Next.js development agency",
  ],
  authors: [{ name: "NexoVexo" }],
  creator: "NexoVexo",
  publisher: "NexoVexo",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "NexoVexo — AI-Aware DevSecOps, Cloud, AI & Automation",
    description:
      "We design and ship custom software, AI integrations, and secure, automated operations — built to perform.",
    url: SITE_URL,
    type: "website",
    siteName: "NexoVexo",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "NexoVexo — Cloud · AI · DevOps · Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexoVexo — AI-Aware DevSecOps, Cloud, AI & Automation",
    description:
      "A software house specializing in AI-aware security, operations and custom software delivery.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
