import table from "../../../helpers/table.js";

const text = `
    CREATE TABLE IF NOT EXISTS user_auth (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        auth_id INTEGER REFERENCES authentication(id) NOT NULL,
        UNIQUE (user_id, auth_id)
    )
`;

const userAuth= table(text);

export default userAuth;