import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/helper/session";
import SignOutBtn from "@/app/(auth)/_lib/_components/SignOutBtn";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="container m-2 mx-auto">
      <h1 className="my-2 text-2xl font-bold">Profile</h1>
      <pre className="bg-secondary my-2 rounded-lg p-4">{JSON.stringify(user, null, 2)}</pre>
      <SignOutBtn />
    </main>
  );
}
