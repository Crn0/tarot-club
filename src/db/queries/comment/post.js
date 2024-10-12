import pool from "../../pool.js";
import get from "./get.js";

const createComment = async (userId, body) => {
    const text = `
        WITH insert_comment AS (
            INSERT INTO comment 
                (body)
            VALUES
                ($2)
            RETURNING id)

        INSERT INTO user_comment
            (user_id, comment_id)
        VALUES
            ($1, (SELECT id FROM insert_comment))
        RETURNING comment_id
    `;
    const query = {
        text,
        name: 'insert-comment',
        values: [userId, body]
    };

    const { rows } = await pool.query(query);

    return await get.getComment(rows[0].comment_id);
};


export default {
    createComment
};