import crypto from "crypto";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { AppError, EmailInUseError, ErrorCode } from "@/lib/helper/errors";
import { UserSignupSchema, UserSignupType } from "@/app/_shared/_schema/auth-form-schema";

import { InsertUserType } from "@/data-access/orm/schema/auth-db-schema";
import { createUser, getUserByEmail } from "@/data-access/repositories/auth-repo";
import { ServiceResponse } from "@/shared/type";

const ITERATIONS = 10000;
export async function signupService(userData: z.infer<typeof UserSignupSchema>): Promise<ServiceResponse<string>> {
  try {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new EmailInUseError();
    }

    const dbData = await convertToDbUser(userData);
    const insertedUser = await createUser(dbData);

    if (!insertedUser) {
      throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create user");
    }

    return {
      data: insertedUser.id,
      error: null,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        data: null,
        error: error,
      };
    }
    console.error("Signup error:", error);
    return {
      data: null,
      error: new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Error while signing up", {
        originalError: error instanceof Error ? error.message : String(error),
      }),
    };
  }
}

async function convertToDbUser(userData: UserSignupType) {
  const salt = crypto.randomBytes(128).toString("base64");
  const hashedPassword = await hashPassword(userData.password, salt);

  const dbData: InsertUserType = {
    id: createId(),
    email: userData.email,
    hashedPassword: hashedPassword,
    name: userData.name,
    role: userData.role,
  };

  return dbData;
}

async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(plainTextPassword, salt, ITERATIONS, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
}
