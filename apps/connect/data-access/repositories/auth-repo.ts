import { eq } from "drizzle-orm";

import { AppError, ErrorCode } from "@/lib/helper/errors";

import { db } from "../orm/db";
import { users } from "../orm/schema";
import { InsertUserType } from "../orm/schema/auth-db-schema";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  } catch (error) {
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to fetch user", {
      originalError: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function createUser(userData: InsertUserType) {
  try {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
      })
      .returning({
        id: users.id,
        email: users.email,
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
