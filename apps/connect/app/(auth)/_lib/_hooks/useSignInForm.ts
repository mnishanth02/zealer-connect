import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/components/ui/sonner";
import { useForm } from "react-hook-form";

import { UserLoginSchema, UserLoginType } from "@/app/_shared/_schema/auth-form-schema";

export const useSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UserLoginType) => {
    try {
      setLoading(true);
      console.log("values->", values);

      // await signUpAction(values);
      toast.success("Login successfully");
    } catch (error) {
      toast.error("Error while login");
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
