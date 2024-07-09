import crypto from "crypto";
import { z } from "zod";

import { AppError, EmailInUseError, ErrorCode, LoginError } from "@/lib/helper/errors";
import { UserLoginSchema, UserSignupSchema, UserSignupType } from "@/app/_shared/_schema/auth-form-schema";

import { InsertProfileType, SelectUserType } from "@/data-access/orm/schema/auth-db-schema";
import {
  createAccount,
  createProfile,
  createUser,
  getAccountByUserId,
  getUserByEmail,
} from "@/data-access/repositories/auth-repo";
import { ServiceResponse } from "@/shared/type";

export async function signupService(userData: z.infer<typeof UserSignupSchema>): Promise<ServiceResponse<string>> {
  try {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new EmailInUseError();
    }

    const user = await createUser(userData.email, userData.role);

    if (!user) {
      throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create user");
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hashedPassword = await hashPassword(userData.password, salt);
    await createAccount(user.id, hashedPassword, salt);

    await createProfile(getProfileData(userData, user.id));

    return {
      data: user.id,
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

export async function signInService(userData: z.infer<typeof UserLoginSchema>): Promise<ServiceResponse<string>> {
  try {
    const user = await getUserByEmail(userData.email);
    if (!user) {
      throw new LoginError();
    }

    const isPasswordCorrect = await verifyPassword(user, userData.password);

    if (!isPasswordCorrect) {
      throw new LoginError();
    }

    return {
      data: user.id,
      error: null,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        data: null,
        error: error,
      };
    }
    console.error("Login error:", error);
    return {
      data: null,
      error: new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Error while Login", {
        originalError: error instanceof Error ? error.message : String(error),
      }),
    };
  }
}

//  ******************* Helper Function ********************

function getProfileData(userData: UserSignupType, userId: string) {
  const dbProfile: InsertProfileType = {
    userId,
    displayName: userData.email,
    imageUrl: "",
    bio: "",
  };

  return dbProfile;
}

const ITERATIONS = 10000;
async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(plainTextPassword, salt, ITERATIONS, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function verifyPassword(user: SelectUserType, plainTextPassword: string) {
  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.hashedPassword;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.hashedPassword == hash;
}
