
import 'dotenv/config';
import * as crypto from "node:crypto";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Query from '../../db/queries/index.js';

const db = Query.authQueries;

const verifyCb = async (accessToken, refreshToken, profile, done) => {
    const {
        provider,
        id: tokenId,
        name: {givenName}, 
    } = profile

    let user = await db.get.getAuthUser(tokenId);

    if (!user) {
        const id = crypto.randomBytes(10).toString('hex');

        user = await db.post.createAuthUser(provider, tokenId, `${givenName}-${id}`);

        return done(null, user);
    };


    return done(null, user);
};


export default new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['email', 'profile'],
    state: true,
},
verifyCb
);