"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Button } from "@ui/components/ui/button";
import { Card, CardFooter } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { useSignInForm } from "../_hooks/useSignInForm";
import SignInForm from "./signin-form";

interface SignInProviderProps {}

const SignInProvider: FC<SignInProviderProps> = () => {
  const { methods, onHandleSubmit, isPending } = useSignInForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit}>
        <Card className="mx-auto min-w-[400px] max-w-sm">
          <SignInForm />

          <CardFooter className="flex flex-col gap-4">
            <Button isLoading={isPending} disabled={isPending} type="submit" className="w-full">
              Login
            </Button>

            <Button disabled={isPending} type="button" variant="outline" className="w-full">
              <Link href={"/api/login/google"}>Login with Google</Link>
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SignInProvider;
