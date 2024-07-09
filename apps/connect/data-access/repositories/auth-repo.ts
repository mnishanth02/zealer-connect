import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

import { AppError, ErrorCode } from "@/lib/helper/errors";
import { UserRoleEnumT } from "@/app/_shared/_schema/auth-form-schema";

import { db } from "../orm/db";
import { users } from "../orm/schema";
import { accounts, InsertProfileType, profiles } from "../orm/schema/auth-db-schema";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    console.log("get User ->", user);
    return user;
  } catch (error) {
    console.log("Get user error ->", error);

    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to fetch user", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function createUser(email: string, role: UserRoleEnumT) {
  try {
    const [user] = await db
      .insert(users)
      .values({
        id: createId(),
        email,
        role,
      })
      .returning({
        id: users.id,
        email: users.email,
        role: users.role,
      });
    return user;
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new AppError(ErrorCode.CONFLICT, "User already exists");
    }
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create user", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}
export async function createAccount(userId: string, hashedPassword: string, salt: string) {
  try {
    const [account] = await db
      .insert(accounts)
      .values({
        userId,
        accountType: "email",
        hashedPassword,
        salt,
      })
      // .onConflictDoNothing()
      .returning();
    return account;
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new AppError(ErrorCode.CONFLICT, "Account already exists");
    }
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create Account", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}
export async function createAccountByGoogle(userId: string, googleId: string) {
  try {
    const [account] = await db
      .insert(accounts)
      .values({
        userId,
        accountType: "google",
        googleId,
      })
      .onConflictDoNothing()
      .returning();
    return account;
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new AppError(ErrorCode.CONFLICT, "Account already exists");
    }
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create Account", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}
export async function createAccountByStrava(userId: string, stravaId: string) {
  try {
    const [account] = await db
      .insert(accounts)
      .values({
        userId,
        accountType: "strava",
        stravaId,
      })
      .onConflictDoNothing()
      .returning();
    return account;
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new AppError(ErrorCode.CONFLICT, "Account already exists");
    }
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create Account", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function createProfile(profileData: InsertProfileType) {
  try {
    const [profile] = await db
      .insert(profiles)
      .values({
        ...profileData,
      })
      .onConflictDoNothing()
      .returning();
    return profile;
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new AppError(ErrorCode.CONFLICT, "Profile already exists");
    }
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to create profile", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function getAccountByUserId(userId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });
}
