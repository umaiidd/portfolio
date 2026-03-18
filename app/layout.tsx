import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import Smooth from "@/components/animations/Smooth";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full Stack Developer building production-grade web apps, distributed systems, and cloud-native backends.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Cursor />
        <Smooth>{children}</Smooth>
      </body>
    </html>
  );
}
