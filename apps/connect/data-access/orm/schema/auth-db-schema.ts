import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { accountTypeEnum, userRoleEnum } from "./enums";

//  ************************* Table Schema ******************** //
export const users = pgTable("user", {
  id: text("id").primaryKey().unique(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date", withTimezone: true }),
  role: userRoleEnum("user_role").default("public"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
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
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  athleteId: varchar("athlete_id", { length: 6 }).notNull().unique(),
  displayName: text("display_name"),
  sport: text("sport"),
  imageUrl: text("image_url"),
  bio: text("bio").notNull().default(""),
});

// export const circles = pgTable("circles", {
//   id: serial("id").primaryKey(),
//   circleId: varchar("circle_id", { length: 6 }).notNull().unique(),
//   name: text("name").notNull(),
//   description: text("description"),
//   adminId: text("admin_id")
//     .references(() => users.id)
//     .notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// // Circle memberships
// export const circleMemberships = pgTable("circle_memberships", {
//   id: serial("id").primaryKey(),
//   circleId: integer("circle_id")
//     .references(() => circles.id)
//     .notNull(),
//   athleteId: integer("athlete_id")
//     .references(() => profiles.id)
//     .notNull(),
//   status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull(),
// });

// Articles
// export const articles = pgTable("articles", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   authorId: text("author_id")
//     .references(() => users.id)
//     .notNull(),
//   circleId: integer("circle_id").references(() => circles.id),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// // Events
// export const events = pgTable("events", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   description: text("description").notNull(),
//   date: timestamp("date").notNull(),
//   location: text("location"),
//   organizerId: text("organizer_id")
//     .references(() => users.id)
//     .notNull(),
//   circleId: integer("circle_id").references(() => circles.id),
// });

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
