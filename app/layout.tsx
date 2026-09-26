import type { Metadata, Viewport } from "next";
import { AppFooter } from "@ieee/ui/layout/app-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "NODE | IEEE SRMIST",
  description: "Upcoming IEEE SRMIST events, meetings and workshops.",
  applicationName: "NODE",
  appleWebApp: {
    capable: true,
    title: "NODE",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col antialiased">
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
