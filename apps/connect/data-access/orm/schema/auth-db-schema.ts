import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { accountTypeEnum, userRoleEnum } from "./enums";

//  ************************* Table Schema ******************** //
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date", withTimezone: true }),
  role: userRoleEnum("user_role").default("public"),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountType: accountTypeEnum("account_type").notNull(),
  googleId: text("google_id").unique(),
  stravaId: text("strava_id").unique(),
  hashedPassword: text("hashed_password"),
  salt: text("salt"),
});

export const profiles = pgTable("profile", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  imageUrl: text("image_url"),
  bio: text("bio").notNull().default(""),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

//  ************************* Schema ******************** //

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertAccountSchema = createInsertSchema(accounts);
export const selectAccountSchema = createSelectSchema(accounts);

export const insertProfileSchema = createInsertSchema(profiles);
export const selectProfileSchema = createSelectSchema(profiles);

//  ************************* Type ******************** //

export type InsertUserType = z.infer<typeof insertUserSchema>;
export type InsertAccountType = z.infer<typeof insertAccountSchema>;
export type InsertProfileType = z.infer<typeof insertProfileSchema>;

export type SelectUserType = z.infer<typeof selectUserSchema>;
