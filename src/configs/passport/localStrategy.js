import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import Query from '../../db/queries/index.js';

const db = Query.userQueries

const options = { usernameField: 'email', passwordField: 'pwd' };

const verifyCb = async (email, password, done) => {
    try {
        const user = await db.get.getUserByEmail(email);

        if (!user) return done(null, false, { message: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return done(null, false, { message: 'Invalid email or password' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};


export default new LocalStrategy(options, verifyCb);


