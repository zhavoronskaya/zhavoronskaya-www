import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/utils.css";
import BaseLayout from "@/theme/components/LayoutBaseV1";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zhavoronskaya",
  description: "Elena Zhavoronskaya Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
