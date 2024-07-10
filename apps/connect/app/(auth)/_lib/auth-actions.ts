"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZSAError } from "zsa";

import { AFTER_LOGIN_URL } from "@/lib/app-config";
import { ErrorCode, getHttpStatusFromErrorCode } from "@/lib/helper/errors";
import { rateLimitByIp, rateLimitByKey } from "@/lib/helper/limiter";
import { setSession } from "@/lib/helper/session";
import { lucia, validateRequest } from "@/lib/lucia";
import { unauthenticatedAction } from "@/lib/safe-action";
import { UserLoginSchema, UserSignupSchema } from "@/app/_shared/_schema/auth-form-schema";

import { signInService, signupService } from "@/services/auth-service";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(UserSignupSchema)
  .handler(async ({ input }) => {
    // TODO test the error scenario
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });

    const { data, error } = await signupService(input);

    if (error) {
      const status = getHttpStatusFromErrorCode(error.code);
      throw new ZSAError(error.code, { status, error });
    }

    if (!data) {
      throw new ZSAError(ErrorCode.ERROR, { status: 500, message: "Failed to create account" });
    }
    //  if error retirn ZsaError
    await setSession(data);
    return redirect(AFTER_LOGIN_URL);
  });

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(UserLoginSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });

    // const { data, error } = await signupService(input);

    const { data, error } = await signInService(input);

    if (error) {
      const status = getHttpStatusFromErrorCode(error.code);
      throw new ZSAError(error.code, { status, error });
    }

    if (!data) {
      throw new ZSAError(ErrorCode.ERROR, { status: 500, message: "Failed to create account" });
    }
    await setSession(data);
    redirect(AFTER_LOGIN_URL);
  });

export const signOutACtion = async () => {
  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  redirect("/");
};
