import table from "../../../helpers/table.js";

const text = `
    CREATE TABLE IF NOT EXISTS comment (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        body TEXT NOT NULL,
        private BOOLEAN DEFAULT FALSE,
        date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
`;

const comment = table(text);

export default comment;