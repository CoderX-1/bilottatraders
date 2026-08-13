import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Bilotta Traders Group", template: "%s | Bilotta Traders" },
  description: "Global commodity trading, reselling and brokerage across key international markets.",
  icons: { icon: "https://bilottatraders.com/wp-content/uploads/2023/07/bilotta-traders.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
