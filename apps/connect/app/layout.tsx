import type { Metadata } from "next";

import "./globals.css";

import { cn } from "@repo/ui/lib/utils";

import { fontMono, giestSans } from "@/lib/fonts";

import { Providers } from "./_shared/_providers/providers";

export const metadata: Metadata = {
  title: "Zealer Connect",
  description: "Zealers Space for Runners, Trekkers and All Fitness enthusiasts",
  icons: [{ rel: "icon", type: "image/png", sizes: "48x48", url: "/logo.png" }],
  keywords: "connect",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background flex flex-col font-sans antialiased", giestSans.variable, fontMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
