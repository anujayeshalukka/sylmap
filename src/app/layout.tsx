import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sylmap — Navigate the Academic Universe",
  description: "Discover universities, explore programmes, compare curricula, access resources, and plan your academic future — all in one intelligent platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased h-full text-slate-100 bg-slate-950`}>
      <body
        suppressHydrationWarning
        className="h-full w-full bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      >
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}

