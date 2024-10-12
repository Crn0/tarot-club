import pool from "../../pool.js";



const patchComment = async (id, body) => {
    const text = `
        UPDATE comment
        SET
            body = $2
        WHERE id = $1
        RETURNING *
    `;
    
    const query = {
        text,
        name: 'patch-query',
        values: [id, body]
    };

    const { rows } = await pool.query(query);

    return rows[0]
};

export default {
    patchComment
}