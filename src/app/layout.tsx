import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayoutWithDecoration from "@/components/BaseLayout/BaseLayoutWithDecoration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zhavoronskaya",
  description: "3D Artist Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <BaseLayoutWithDecoration>{children}</BaseLayoutWithDecoration>
      </body>
    </html>
  );
}
