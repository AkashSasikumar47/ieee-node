import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Node | IEEE SRMIST",
  description:
    "Stay updated with all IEEE events, workshops, and meetings in one sleek, minimal feed.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className={`${montserrat.className} flex min-h-screen flex-col`}>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
