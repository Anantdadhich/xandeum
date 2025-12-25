import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xandeum | Exabytes for Solana Programs",
  description: "Xandeum is building a revolutionary decentralized storage solution for Solana. Scalable to exabytes, smart contract-native, with liquid staking rewards. Join the future of blockchain storage.",
  keywords: ["Xandeum", "Solana", "Decentralized Storage", "pNodes", "Liquid Staking", "xandSOL", "XAND", "Blockchain Storage", "Web3"],
  icons: {
    icon: "/icon.webp",
    shortcut: "/icon.webp",
    apple: "/icon.webp",
  },
  openGraph: {
    title: "Xandeum | Exabytes for Solana Programs",
    description: "Revolutionary decentralized storage solution for Solana. Scalable, secure, and smart contract-native.",
    url: "https://xandeum.network",
    siteName: "Xandeum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xandeum | Exabytes for Solana Programs",
    description: "Revolutionary decentralized storage solution for Solana. Scalable, secure, and smart contract-native.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-[#050505]`}
        suppressHydrationWarning
      >
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
