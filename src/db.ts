/* eslint-disable @typescript-eslint/no-explicit-any */
import pg from "pg";
// import 'dotenv/config'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, NODE_ENV } = process.env;

export const pool = new pg.Pool({
	host: PG_HOST,
	port: Number(PG_PORT),
	user: PG_USERNAME,
	password: PG_PASSWORD,
	database: PG_DATABASE,
	ssl: NODE_ENV === "production"
});

export const executeQuery = async (query: string, parameters?: Array<any>) => {
	const client = await pool.connect();
	try {
		const result = await client.query(query, parameters);
		return result;
	} catch (error: any) {
		console.error(error.stack);
		error.name = "dbError";
		throw error;
	} finally {
		client.release();
	}
};

export const createUsersTable = async () => {
	const query = `
        CREATE TABLE IF NOT EXISTS "users" (
            "user_id" SERIAL PRIMARY KEY,
            "username" varchar NOT NULL,
            "password" varchar NOT NULL
        )`;
	await executeQuery(query);
	console.log("Users table initialized");
};
