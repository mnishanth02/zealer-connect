import { CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { cn } from "@ui/lib/utils";
import { useFormContext } from "react-hook-form";
import { useMedia } from "react-use";

import { PERSONAL_FORM } from "@/app/_shared/_constants/athlete-constants";
import FormGenerator from "@/app/_shared/_form/form-generator";

type FormField = (typeof PERSONAL_FORM)[0] & {
  row?: number;
  width?: string;
};

const PersonalForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const iswide = useMedia("(max-width: 768px)");

  const fieldsByRow = (PERSONAL_FORM as FormField[]).reduce(
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
        <CardTitle className="text-xl font-semibold md:text-2xl">Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(fieldsByRow).map(([row, fields]) => (
          <div key={row} className={iswide ? "flex flex-col gap-3" : "flex flex-wrap"}>
            {fields.map((field) => (
              <div key={field.id} className={cn("px-2", iswide ? "w-full" : `${field.width}`)}>
                <FormGenerator control={control} {...field} errors={errors} name={field.name} />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default PersonalForm;
