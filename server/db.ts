import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Allow running without DATABASE_URL for local development
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
  });

  // Handle pool errors to prevent crashes
  pool.on('error', (err) => {
    console.error('Unexpected database pool error:', err);
  });

  db = drizzle({ client: pool, schema });
  console.log("[Database] PostgreSQL connection pool initialized");
} else {
  console.log("[Database] No DATABASE_URL set - using in-memory storage instead");
}

export { pool, db };