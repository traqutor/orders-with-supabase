import { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  driver: 'pglite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;