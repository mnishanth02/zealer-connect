import type { Config } from "drizzle-kit";

import { env } from "./env";

export default {
  schema: "./data-access/orm/schema/index.ts",
  dialect: "postgresql",
  out: "./data-access/orm/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
