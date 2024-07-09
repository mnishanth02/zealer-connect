"use client";

import { Button } from "@ui/components/ui/button";
import { useFormStatus } from "react-dom";

import { signOutACtion } from "../auth-actions";

export default function SignOutBtn() {
  return (
    <form action={signOutACtion} className="w-full text-left">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={"destructive"}>
      Sign{pending ? "ing" : ""} out
    </Button>
  );
};
