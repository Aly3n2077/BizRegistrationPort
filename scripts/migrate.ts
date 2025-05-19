import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for Neon serverless
neonConfig.webSocketConstructor = ws;

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL environment variable is not set");
  process.exit(1);
}

const runMigration = async () => {
  try {
    console.log("Starting database migration...");
    
    // Create pool and db
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    
    // Perform migration (this will push all schemas defined in shared/schema.ts)
    await migrate(db, { migrationsFolder: "./migrations" });
    
    console.log("Migration completed successfully!");
    
    // Close the pool and exit
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigration();