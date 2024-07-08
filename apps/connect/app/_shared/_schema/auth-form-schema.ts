import { z, ZodType } from "zod";

import { userRoleEnum } from "@/data-access/orm/schema";

// *******************  Enum  ******************************

const UserRoleEnum = z.enum(["public", "athlete", "admin"]);
export type UserRoleEnumT = typeof userRoleEnum;

const AccountTypeEnum = z.enum(["email", "google", "strava"]);
export type AccountTypeEnumT = typeof AccountTypeEnum._type;

// *******************  Schema  ******************************

export const UserSignupSchema = z.object({
  name: z.string().min(3, { message: "Name too short (min 3 chars)" }),
  email: z.string().email({ message: "Invalid email format" }),
  role: UserRoleEnum,
  password: z
    .string()
    .min(8, { message: "Password too weak (min 8 chars)" })
    .max(64, {
      message: "Password too long (max 64 chars)",
    })
    .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""), "Use only letters, numbers, and common symbols"),
});

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password too weak (min 8 chars)" }).max(64, {
    message: "Password too long (max 64 chars)",
  }),
});

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password too weak (min 8 chars)" })
      .max(64, {
        message: "Password too long (max 64 chars)",
      })
      .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""), "Use only letters, numbers, and common symbols"),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// *******************  Types  ******************************

export type UserSignupType = z.infer<typeof UserSignupSchema>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};
