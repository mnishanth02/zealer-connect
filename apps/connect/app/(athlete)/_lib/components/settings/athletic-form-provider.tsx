"use client";

import React, { FC } from "react";
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { useAthleteForm } from "../../hooks/useAthleteForm";
import AthleticForm from "./athletic-form";

interface AthleticFormProviderProps {}

const AthleticFormProvider: FC<AthleticFormProviderProps> = () => {
  const { methods, onHandleSubmit, isPending } = useAthleteForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className={"flex flex-col gap-4"}>
          <Card className={"min-h-[430px]"}>
            <AthleticForm />
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

export default AthleticFormProvider;
