"use client";

import React, { FC } from "react";
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
import { FormProvider } from "react-hook-form";

import SettingsForm from "@/app/(athlete)/_lib/components/settings/settings-form";
import { useSettingsForm } from "@/app/(athlete)/_lib/hooks/useSettingsForm";

interface SettingsFormProviderProps {}

const SettingsFormProvider: FC<SettingsFormProviderProps> = () => {
  const { methods, onHandleSubmit, isPending } = useSettingsForm();
  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className={"flex flex-col gap-4"}>
          <Card className={"min-h-[260px]"}>
            <SettingsForm />
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

export default SettingsFormProvider;
