import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xandeum pNodes Analytics | Real-time Network Monitoring",
  description: "Premium analytics platform for monitoring Xandeum Provider Nodes. Real-time metrics, health scores, and network insights.",
  keywords: ["Xandeum", "pNodes", "Analytics", "Blockchain", "Network Monitoring"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-gradient-radial`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
