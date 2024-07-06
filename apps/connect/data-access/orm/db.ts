import { neon, NeonQueryFunction, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";
import * as schema from "./schema";

export const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export const pool = new Pool({ connectionString: env.DATABASE_URL });
