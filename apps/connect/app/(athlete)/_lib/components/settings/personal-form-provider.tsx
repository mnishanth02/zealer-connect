"use client";

import { FC } from "react";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import { usePersonalForm } from "../../hooks/usePersonalForm";
import PersonalForm from "./personal-form";

interface PersonalFormProviderProps {}

const PersonalFormProvider: FC<PersonalFormProviderProps> = () => {
  const { methods, onHandleSubmit } = usePersonalForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <Card className="">
            <PersonalForm />
          </Card>
        </form>
      </FormProvider>
    </section>
  );
};

export default PersonalFormProvider;
