import Image from "next/image";

import SignInProvider from "../_lib/_components/signin-provider";

export default function SignIn() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col justify-center py-12 lg:flex-row lg:items-center">
        <SignInProvider />
      </div>
      <div className="bg-muted relative hidden h-screen items-center justify-center overflow-hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
