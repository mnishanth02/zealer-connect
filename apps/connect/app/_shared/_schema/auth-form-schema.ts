import { z, ZodType } from "zod";

// *******************  Enum  ******************************

const UserRoleEnum = z.enum(["public", "athlete", "admin"]);

// *******************  Schema  ******************************

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z.object({
  type: UserRoleEnum,
  name: z.string().min(3, { message: "Name too short (min 3 chars)" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password too weak (min 8 chars)" })
    .max(64, {
      message: "Password too long (max 64 chars)",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "Use only letters, numbers, and common symbols"
    ),
});

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password too weak (min 8 chars)" })
    .max(64, {
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
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "Use only letters, numbers, and common symbols"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// *******************  Types  ******************************

export type UserRegistrationProps = {
  type: z.infer<typeof UserRoleEnum>;
  name: string;
  email: string;
  password: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};
