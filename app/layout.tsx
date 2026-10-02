import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";
import { AppFooter } from "@ieee/ui/layout/app-footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

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
    <html lang="en" className={unbounded.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <MotionProvider>
          {children}
          <AppFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
