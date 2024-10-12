import Queries from "../../db/queries/index.js";

const db = Queries.userQueries;

const serializeUser = async (user, done) => done(null, user.id);

const deserializeUser = async (id, done) => {
    try {
        const user = await db.get.getUser(id);

        delete user.password;

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};


export  {
    serializeUser,
    deserializeUser,
}