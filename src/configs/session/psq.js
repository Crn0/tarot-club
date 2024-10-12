import 'dotenv/config';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import pool from '../../db/pool.js';

const store = pgSession(session);
const storeOptions = {
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
}

export default session({
    store: new store(storeOptions),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'SessionID',
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    

});

