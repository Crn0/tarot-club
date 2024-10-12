import pool from "../../pool.js";

const delUser = async (id) => {
    const text = `
        WITH deleted_user AS (
            DELETE FROM users
            WHERE id = $1
            RETURNING id)
        , deleted_comments AS (
            DELETE FROM user_comment
            WHERE user_id = (SELECT id FROM deleted_user)
            RETURNING comment_id)
        , deleted_auth_id AS (
            DELETE FROM user_auth
            WHERE user_id = (SELECT id FROM deleted_user)
            RETURNING auth_id)
        , delete_auth AS (
            DELETE FROM authentication
            WHERE id IN (SELECT auth_id FROM deleted_auth_id))

        DELETE FROM comment
        WHERE id IN (SELECT comment_id FROM deleted_comments)
    `;
    const query = {
        text,
        name: 'delete-user',
        values: [id]
    };

    await pool.query(query);
};


export default {
    delUser,
}
