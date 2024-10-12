import 'dotenv/config';
import pg from 'pg';

let url = process.env.LOCAL_URL;
const { Pool } = pg;

if (process.env.NODE_ENV.toLowerCase() !== 'dev') {
    url = process.env.DB_URL;
}
export default new Pool({ connectionString: url });