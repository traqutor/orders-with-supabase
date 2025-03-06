import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';


declare global {
  var _db: ReturnType<typeof drizzle> | undefined;
}



const createDb = (() => {
  return () => {
    if (!global._db) {
      const client = postgres(String(connectionString), { prepare: false });
      global._db = drizzle(client);
    }
    return global._db;
  };
})();

export const sBase = createDb()

