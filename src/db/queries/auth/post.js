import pool from "../../pool.js";
import get from "../user/get.js"

const createAuthUser = async (provider, tokenId, username) => {
    const text = `
        WITH insert_auth AS (
            INSERT INTO authentication
                (provider, token_id)
            VALUES
                ($1, $2)
            RETURNING *)
        , insert_users AS (
            INSERT INTO users
                (username)
            VALUES
                ($3)
            RETURNING *)

        INSERT INTO user_auth
            (user_id, auth_id)
        VALUES
            ((SELECT id FROM insert_users), (SELECT id FROM insert_auth))
        RETURNING user_id
    `;

    const query = {
        text,
        name: 'insert-auth-user',
        values: [provider, tokenId, username]
    };

    const { rows } = await pool.query(query);

    return await get.getUser(rows[0].user_id);
}

export default {
    createAuthUser
};