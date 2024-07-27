import type { Metadata } from "next";
import { cn } from '@/lib/utils'
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get to know the weather from any location just by entering its name.",
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
        {children}
      </body>
    </html>
  );
}
