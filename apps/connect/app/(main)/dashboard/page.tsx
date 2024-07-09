import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { LogOut } from "lucide-react";

import { getCurrentUser } from "@/lib/helper/session";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="container m-2 mx-auto">
      <h1 className="my-2 text-2xl font-bold">Profile</h1>
      <pre className="bg-secondary my-2 rounded-lg p-4">{JSON.stringify(user, null, 2)}</pre>
      <Link className={cn("flex items-center", buttonVariants())} href={"/api/sign-out"}>
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Link>
    </main>
  );
}
