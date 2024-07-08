import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/components/ui/sonner";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

import { UserSignupSchema, UserSignupType } from "@/app/_shared/_schema/auth-form-schema";

import { signUpAction } from "../auth-actions";

export const useSignUpForm = () => {
  const methods = useForm<UserSignupType>({
    resolver: zodResolver(UserSignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "public",
    },
    mode: "onChange",
  });

  const { execute, isPending } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error(err.message);
    },
    onSuccess() {
      toast.success("Acccount created successfully");
    },
  });

  const onSubmit = async (values: UserSignupType) => {
    execute(values);
  };

  const onHandleSubmit = methods.handleSubmit(onSubmit);

  return {
    methods,
    onHandleSubmit,
    isPending,
  };
};
