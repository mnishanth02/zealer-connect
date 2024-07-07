"use client";

import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@repo/ui/ThemeProvider";
import { Toaster } from "@repo/ui/Toaster";
import { TooltipProvider } from "@repo/ui/Tooltip";

import QueryProvider from "./QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextTopLoader color="#15803d" shadow="0 0 10px #15803d,0 0 5px #15803d" />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster position="bottom-right" richColors duration={3000} toastOptions={{ style: { textAlign: "center" } }} />
      </ThemeProvider>
    </QueryProvider>
  );
}
