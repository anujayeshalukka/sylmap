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
  metadataBase: new URL("https://sylmap.com"),
  title: "Sylmap — Every Course. Every Curriculum. OneMap.",
  description:
    "Discover universities, programmes, curricula, learning resources and career pathways with Sylmap.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sylmap — Every Course. Every Curriculum. OneMap.",
    description:
      "Discover universities, programmes, curricula, learning resources and career pathways with Sylmap.",
    url: "https://sylmap.com",
    siteName: "Sylmap",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sylmap — Every Course. Every Curriculum. OneMap.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylmap — Every Course. Every Curriculum. OneMap.",
    description:
      "Discover universities, programmes, curricula, learning resources and career pathways with Sylmap.",
    images: ["/og-image.jpg"],
  },
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

