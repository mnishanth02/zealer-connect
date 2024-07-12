"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

interface NextError extends Error {
  digest?: string;
}

export default function ErrorPage({ error }: { error: NextError }) {
  const [countdown, setCountdown] = useState(15);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      router.push("/");
    }

    return () => clearInterval(interval);
  }, [countdown, router]);

  return (
    <div className="bg-background dark relative flex h-full w-full flex-1 flex-col items-center justify-center space-y-6">
      <h1 className="lg:font-heading px-6 text-center font-sans text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl lg:tracking-normal xl:text-7xl">
        Oops! Something went wrong
      </h1>
      <h3 className="text-muted-foreground max-w-[40rem] px-6 text-center text-lg leading-normal sm:leading-8">
        {error.message}
      </h3>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "relative h-12 w-full min-w-[110px] max-w-[200px] items-center overflow-hidden rounded-full font-bold"
        )}
      >
        Go back home <span className="ml-2 font-bold">({countdown})</span>
      </Link>
    </div>
  );
}
