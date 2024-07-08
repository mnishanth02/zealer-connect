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
  const { methods, onHandleSubmit, loading } = useSignInForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit}>
        <Card className="mx-auto min-w-[400px] max-w-sm">
          <SignInForm />

          <CardFooter className="flex flex-col gap-4">
            <Button isLoading={loading} disabled={loading} type="submit" className="w-full">
              Login
            </Button>
            <Button disabled={loading} type="button" variant="outline" className="w-full">
              Login with Google
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
