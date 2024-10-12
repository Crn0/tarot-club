import table from "../../../helpers/table.js"

const text = `
    CREATE TABLE IF NOT EXISTS user_comment (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        comment_id INTEGER REFERENCES comment(id) NOT NULL,
        UNIQUE (user_id, comment_id)
    )
`;

const userComment = table(text);

export default userComment;