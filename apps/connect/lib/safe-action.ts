import { createServerActionProcedure, ZSAError } from "zsa";

import { env } from "@/env";
import { AppError } from "./helper/errors";
import { assertAuthenticated } from "./helper/session";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof ZSAError;

  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    const appError = err?.data.error as AppError;
    console.log("appError->", appError);
    return {
      code: appError?.code ?? "ERROR",
      message: `${isDev ? "DEV ONLY ENABLED - " : ""}${appError?.message}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });
