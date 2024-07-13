import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/components/ui/sonner";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

import { UserLoginSchema, UserLoginType } from "@/app/_shared/_schema/auth-form-schema";
import { signInAction } from "@/app/(auth)/_lib/auth-actions";

export const useSettingsForm = () => {
  const methods = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { execute, isPending } = useServerAction(signInAction, {
    onError({ err }) {
      toast.error(err.message);
    },
    onSuccess() {
      toast.success("Logged in successfully");
    },
  });

  const onSubmit = async (values: UserLoginType) => {
    execute(values);
  };

  const onHandleSubmit = methods.handleSubmit(onSubmit);

  return {
    methods,
    onHandleSubmit,
    isPending,
  };
};
