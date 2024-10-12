import table from "../../../helpers/table.js";

const text = `
    CREATE TYPE role AS ENUM ('user', 'admin');
    CREATE TABLE IF NOT EXISTS users  (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) UNIQUE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        role role DEFAULT 'user'
    )
`;

const user = table(text);

export default user;