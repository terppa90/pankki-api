// /users queries
export const insertUser = "INSERT INTO users (username, password) VALUES ($1, $2);";

export const findAllUsers = "SELECT user_id, username FROM users;";

export const findOneUser = "SELECT * FROM users WHERE username = $1;";