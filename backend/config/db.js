import pkg from "pg";
const { Pool } = pkg;
import { config } from "dotenv";

config(); // Load environment variables

// Create connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("PostgreSQL database connected successfully");
  release();
});

export default pool;
