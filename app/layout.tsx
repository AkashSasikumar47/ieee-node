import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AR-ONE | Lead Management",
  description: "Streamline your corporate catering workflow with AR-ONE, an all-in-one SaaS solution for managing leads, tracking performance, sending mass emails, and boosting conversions. Effortlessly import your data, access powerful analytics, and grow your business with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
