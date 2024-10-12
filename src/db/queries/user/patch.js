import pool from "../../pool.js";



const patchUsername = async (id, username) => {
    const text = `
        UPDATE users
        SET
            username = $2
        WHERE id = $1
        RETURNING id, username, email
    `;
    const query = {
        text,
        name: 'patch-user-info',
        values: [id, username]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};


export default {
    patchUsername,
};