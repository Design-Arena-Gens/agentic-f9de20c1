import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Celestial Age Explorer",
  description:
    "An immersive age calculator that reveals your age in cosmic detail and celebrates every milestone."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-midnight text-white">
        {children}
      </body>
    </html>
  );
}
