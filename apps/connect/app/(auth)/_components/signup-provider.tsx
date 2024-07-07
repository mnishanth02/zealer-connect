"use client";

import { FC } from "react";
import Link from "next/link";
import { Button } from "@ui/components/ui/button";
import { Card, CardFooter } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { useSignUpForm } from "../_hooks/useSignUpForm";
import SignUpForm from "./signup-form";

interface SignUpProviderProps {}

const SignUpProvider: FC<SignUpProviderProps> = () => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit}>
        <Card className="mx-auto min-w-[400px] max-w-sm">
          <SignUpForm />

          <CardFooter className="flex flex-col gap-4">
            <Button isLoading={loading} disabled={loading} type="submit" className="w-full">
              Create an account
            </Button>
            <Button disabled={loading} type="button" variant="outline" className="w-full">
              Sign up with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account ?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SignUpProvider;
