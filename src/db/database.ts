// import dotenv from 'dotenv';
// import {Pool} from 'pg'

// dotenv.config();

// const pool = new Pool({
//   host: process.env.PGHOST || 'localhost',
//   port: process.env.PGPORT as unknown as number || 5432,
//   database: process.env.DATABASE_URL,
//   user: process.env.PGUSER ||  'postgres',
//   password: process.env.PGPASSWORD || 'postgres',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export default pool;


import 'dotenv/config';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle({ client: pool, schema });

export default db