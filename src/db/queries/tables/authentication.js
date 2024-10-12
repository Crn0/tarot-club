import table from "../../../helpers/table.js";

const text = `
    CREATE TABLE IF NOT EXISTS authentication (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        provider VARCHAR(255) NOT NULL,
        token_id VARCHAR(255) UNIQUE NOT NULL
    )
`;

const authentication = table(text);

export default authentication;

