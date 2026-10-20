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

export const metadata: Metadata = {
  metadataBase: new URL("https://nexovexo.com"),
  title: {
    default: "NexoVexo — Cloud, AI, DevOps & Automation Software House",
    template: "%s | NexoVexo",
  },
  description:
    "NexoVexo is a software house building high-performance custom websites, cloud platforms, AI integrations, and automation for ambitious teams.",
  keywords: [
    "software house",
    "custom web development",
    "cloud",
    "DevOps",
    "AI automation",
    "Next.js development",
  ],
  openGraph: {
    title: "NexoVexo — Cloud, AI, DevOps & Automation",
    description:
      "We design and ship custom websites, cloud platforms, and AI-driven products.",
    type: "website",
    siteName: "NexoVexo",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
