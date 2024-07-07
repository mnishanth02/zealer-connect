import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { cn } from "@repo/ui/lib/utils";

import { Providers } from "./_shared/_providers/providers";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealer Connect",
  description: "Zealers Space for Runners, Trekkers and All Fitness enthusiasts",
  icons: [{ rel: "icon", type: "image/svg", sizes: "48x48", url: "/logo.svg" }],
  keywords: "connect",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background flex-col antialiased", jakarta.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
