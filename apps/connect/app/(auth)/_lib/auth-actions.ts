"use server";

import { redirect } from "next/navigation";
import { ZSAError } from "zsa";

import { AFTER_LOGIN_URL } from "@/lib/app-config";
import { ErrorCode, getHttpStatusFromErrorCode } from "@/lib/helper/errors";
import { rateLimitByIp } from "@/lib/helper/limiter";
import { setSession } from "@/lib/helper/session";
import { unauthenticatedAction } from "@/lib/safe-action";
import { UserSignupSchema } from "@/app/_shared/_schema/auth-form-schema";

import { signupService } from "@/services/auth-service";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(UserSignupSchema)
  .handler(async ({ input }) => {
    // TODO test the error scenario
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });

    const { data, error } = await signupService(input);

    if (error) {
      const status = getHttpStatusFromErrorCode(error.code);
      throw new ZSAError(error.code, { status, cause: error });
    }

    if (!data) {
      throw new ZSAError(ErrorCode.ERROR, { status: 500, message: "Failed to create account" });
    }
    //  if error retirn ZsaError
    await setSession(data);
    return redirect(AFTER_LOGIN_URL);
  });
