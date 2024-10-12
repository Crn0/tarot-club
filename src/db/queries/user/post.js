import pool from "../../pool.js";



const createUser = async (username, email, password) => {
    const text = `
        INSERT INTO users
            (username, email, password)
        VALUES 
            ($1, $2, $3)
        RETURNING *
    `;
    
    const query = {
        text,
        name: 'insert-user',
        values: [username, email, password]
    };

    const { rows } = await pool.query(query);

    return rows[0];
};


export default {
    createUser
};
