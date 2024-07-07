import { CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { cn } from "@ui/lib/utils";
import { useFormContext } from "react-hook-form";

import { USER_LOGIN_FORM } from "@/app/_shared/_constants/auth-constants";
import FormGenerator from "@/app/_shared/form/form-generator";

type FormField = (typeof USER_LOGIN_FORM)[0] & {
  row?: number;
  width?: string;
};

const SignInForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // Group fields by row
  const fieldsByRow = (USER_LOGIN_FORM as FormField[]).reduce(
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
        <CardTitle className="text-xl font-bold md:text-4xl">Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(fieldsByRow).map(([row, fields]) => (
          <div key={row} className="-mx-2 flex flex-wrap">
            {fields.map((field) => (
              <div key={field.id} className={cn("px-2", field.width || "w-full")}>
                <FormGenerator control={control} {...field} errors={errors} name={field.name} />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default SignInForm;
