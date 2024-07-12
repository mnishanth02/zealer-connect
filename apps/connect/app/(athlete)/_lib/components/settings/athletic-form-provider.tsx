"use client";

import { FC } from "react";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { useAthleteForm } from "../../hooks/useAthleteForm";
import AthleticForm from "./athletic-form";

interface AthleticFormProviderProps {}

const AthleticFormProvider: FC<AthleticFormProviderProps> = () => {
  const { methods, onHandleSubmit } = useAthleteForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <Card className="">
            <AthleticForm />
          </Card>
        </form>
      </FormProvider>
    </section>
  );
};

export default AthleticFormProvider;
