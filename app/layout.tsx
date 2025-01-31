import type { Metadata } from "next";
import { cn } from '@/lib/utils'
import "./globals.css";

import SessionWrapper from "@/components/component/SessionWrapper";

import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get to know the weather from any location just by entering its name. Create an account to save your favorite locations.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
        )}
      >
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <Analytics />
      </body>
    </html>
  );
}
