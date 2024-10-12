import pool from "../../pool.js";

const getCommentList = async (limit, offset, isPrivate = false) => {
    const text = `
        SELECT c.*, JSON_BUILD_OBJECT (
                    'id', u.id
                    ,'username', u.username) AS author 
        FROM user_comment AS u_c
        JOIN comment AS c ON u_c.comment_id = c.id
        JOIN users AS u ON u_c.user_id = u.id
        WHERE private = $3
        LIMIT $1
        OFFSET $2
    `;

    const query = {
        text,
        name: 'fetch-comments',
        values: [limit, offset, isPrivate]
    };

    const { rows } = await pool.query(query);

    return rows;
}

const getComment = async (id) => {
    const text = `
    SELECT c.*, JSON_BUILD_OBJECT (
                    'id', u.id
                    ,'username', u.username) AS author 
    FROM user_comment AS u_c
    JOIN comment AS c ON u_c.comment_id = c.id
    JOIN users AS u ON u_c.user_id = u.id
    WHERE u_c.comment_id = $1
    `;
    const query = {
        text,
        name: 'fetch-comment',
        values: [id]
    };

    const { rows } = await pool.query(query);

    return rows[0];
}

export default {
    getCommentList,
    getComment,
}