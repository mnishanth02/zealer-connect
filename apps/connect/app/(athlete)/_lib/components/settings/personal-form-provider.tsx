"use client";

import React, { FC } from "react";
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { usePersonalForm } from "../../hooks/usePersonalForm";
import PersonalForm from "./personal-form";

interface PersonalFormProviderProps {}

const PersonalFormProvider: FC<PersonalFormProviderProps> = () => {
  const { methods, onHandleSubmit, isPending } = usePersonalForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className={"flex flex-col gap-4"}>
          <Card className={"min-h-[430px]"}>
            <PersonalForm />
          </Card>
          <div className={"flex justify-end gap-2"}>
            <Button isLoading={isPending} disabled={isPending} type="submit">
              Save changes
            </Button>

            <Button disabled={isPending} type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default PersonalFormProvider;
