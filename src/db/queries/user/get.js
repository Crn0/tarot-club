import pool from "../../pool.js";

const getUsers = async() => {
    const text = `
        SELECT * FROM users;
    `;
    
    const query = {
        text,
        name: 'fetch-users',
    };

    const { rows } = await pool.query(query);

    return rows;
};

const getUser = async (id) => {
    const text = `
        SELECT * FROM users
        WHERE id = $1
    `;

    const query = {
        text,
        name: 'fetch-user',
        values: [id]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const getUserByEmail = async (email) => {
    const text = `
        SELECT * FROM users
        WHERE LOWER(email) LIKE LOWER(CONCAT('%', CAST($1 AS VARCHAR), '%'))
    `;

    const query = {
        text,
        name: 'fetch-user-by-email',
        values: [email]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};


const getUserByUsername = async (username) => {
    const text = `
        SELECT * FROM users
        WHERE LOWER(username) LIKE LOWER(CONCAT('%', CAST($1 AS VARCHAR), '%'))
    `;

    const query = {
        text,
        name: 'fetch-user-by-username',
        values: [username]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const getUserComments = async (id) => {
    const text = `
        SELECT c.* FROM user_comment AS u_c
        JOIN comment AS c ON u_c.comment_id = c.id
        WHERE u_c.user_id = $1
    `;

    const query = {
        text,
        name: 'fetch-user-comments',
        values: [id]
    };

    const { rows } = await pool.query(query);

    return rows;
};


export default {
    getUsers,
    getUser,
    getUserByEmail,
    getUserByUsername,
    getUserComments,
};

