import pool from "../../pool.js";

const getAuthUser = async (tokenId) => {
    const text = `
        SELECT users.* FROM authentication AS auth
        JOIN user_auth AS u_a ON auth.id = u_a.auth_id
        JOIN users ON u_a.user_id = users.id
        WHERE auth.token_id = $1
    `;

    const query = {
        text,
        name: 'fetch-auth-user',
        values: [tokenId]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

export default {
    getAuthUser
};