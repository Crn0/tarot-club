import pool from "../../pool.js";

const delComment = async (id) => {
    const text = `
    WITH deleted_comment AS (
        DELETE FROM comment
        WHERE id = $1
        RETURNING id)
    DELETE FROM user_comment
    WHERE comment_id = (SELECT id FROM deleted_comment)`;
    
    const query = {
        text,
        name: 'delete-comment',
        values: [id]
    };

    await pool.query(query);
};

const delCommentsByUser = async (userId) => {
    const text = `
    WITH deleted_comment AS (
        DELETE FROM comment
        WHERE id = (SELECT comment_id FROM user_comment AS u_c
                    WHERE u_c.user_id = $1)
        RETURNING id)
    DELETE FROM user_comment
    WHERE comment_id = (SELECT id FROM deleted_comment)`;
    
    const query = {
        text,
        name: 'delete-comments-by-user-id',
        values: [userId]
    };

    await pool.query(query);
};

export default {
    delComment
}