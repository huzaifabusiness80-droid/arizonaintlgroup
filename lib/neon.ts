import { neon } from "@neondatabase/serverless";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_xy3XWfL1vSnt@ep-purple-bar-azr5ohm8.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(databaseUrl);

export default sql;
