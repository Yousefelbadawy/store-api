import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()


const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

export default pool