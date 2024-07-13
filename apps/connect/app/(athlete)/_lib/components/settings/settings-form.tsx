import { CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { cn } from "@ui/lib/utils";
import { useFormContext } from "react-hook-form";
import { useMedia } from "react-use";

import { SETTINGS_FORM } from "@/app/_shared/_constants/athlete-constants";
import FormGenerator from "@/app/_shared/_form/form-generator";

type FormField = (typeof SETTINGS_FORM)[0] & {
  row?: number;
  width?: string;
};

const SettingsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isWide = useMedia("(max-width: 768px)");

  const fieldsByRow = (SETTINGS_FORM as FormField[]).reduce(
    (acc, field) => {
      const row = field.row || 0; // Default to row 0 if not specified
      if (!acc[row]) {
        acc[row] = [];
      }
      acc[row].push(field);
      return acc;
    },
    {} as Record<number, FormField[]>
  );

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold md:text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Object.entries(fieldsByRow).map(([row, fields]) => (
          <div key={row} className={isWide ? "flex flex-col" : "flex flex-wrap"}>
            {fields.map((field) => (
              <div key={field.id} className={cn("px-2", isWide ? "w-full" : `${field.width}`)}>
                <FormGenerator control={control} {...field} errors={errors} name={field.name} />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default SettingsForm;
