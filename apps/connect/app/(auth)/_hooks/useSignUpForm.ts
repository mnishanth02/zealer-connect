import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/components/ui/sonner";
import { useForm } from "react-hook-form";

import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/app/_shared/_schema/auth-form-schema";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      type: "public",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UserRegistrationProps) => {
    try {
      setLoading(true);
      console.log("values->", values);

      // await signUpAction(values);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Error while creating account");
    } finally {
      setLoading(false);
    }
  };

  const onHandleSubmit = methods.handleSubmit(onSubmit);

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
