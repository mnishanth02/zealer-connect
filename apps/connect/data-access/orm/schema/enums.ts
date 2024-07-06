import { pgEnum } from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", ["public", "athlete", "admin"]);
export const skillLevelEnum = pgEnum("skill_level", [
  "beginner",
  "intermediate",
  "advanced",
  "professional",
]);
export const visibilityEnum = pgEnum("visibility", ["public", "circle_only"]);
export const privacyEnum = pgEnum("privacy", [
  "public",
  "private_by_invite",
  "discoverable_by_search",
]);
export const contentTypeEnum = pgEnum("content_type", [
  "article",
  "blog_post",
  "arena_post",
]);
export const reactionTypeEnum = pgEnum("reaction_type", [
  "like",
  "dislike",
  "love",
  "haha",
  "wow",
  "sad",
  "angry",
  "custom",
]);
export const attendanceStatusEnum = pgEnum("attendance_status", [
  "registered",
  "confirmed",
  "attended",
  "not_attended",
]);
export const proficiencyLevelEnum = pgEnum("proficiency_level", [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);
export const productCategoryEnum = pgEnum("product_category", [
  "gear",
  "training_plan",
  "other",
]);
export const productConditionEnum = pgEnum("product_condition", [
  "new",
  "used",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "shipped",
  "completed",
  "cancelled",
]);
export const proposalStatusEnum = pgEnum("proposal_status", [
  "pending",
  "accepted",
  "rejected",
]);
export const mentorshipStatusEnum = pgEnum("mentorship_status", [
  "pending",
  "accepted",
  "active",
  "inactive",
]);
