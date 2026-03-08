import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { TabNavigation } from "@/components/layout/tab-navigation";
import { APP_CONFIG } from "@/lib/config";
import "./globals.css";

// Creative Brief typography: Inter body + IBM Plex Mono for call IDs, CRM
// record numbers, timestamps, and duration data (tabular-nums precision)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fronto AI Mobile | Demo by Humam",
  description: "Native mobile app demo for Fronto AI conversational platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme activates the CSS theme system — Layout Builder sets APP_CONFIG.aesthetic
    // which flows through here to drive all visual treatment via CSS variables.
    <html lang="en" data-theme={APP_CONFIG.aesthetic}>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <TabNavigation />
        {children}
      </body>
    </html>
  );
}
