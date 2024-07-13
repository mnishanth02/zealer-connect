"use client";

import { FC } from "react";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import SettingsForm from "@/app/(athlete)/_lib/components/settings/settings-form";
import { useSettingsForm } from "@/app/(athlete)/_lib/hooks/useSettingsForm";

interface SettingsFormProviderProps {}

const SettingsFormProvider: FC<SettingsFormProviderProps> = () => {
  const { methods, onHandleSubmit } = useSettingsForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <Card className="">
            <SettingsForm />
          </Card>
        </form>
      </FormProvider>
    </section>
  );
};

export default SettingsFormProvider;
