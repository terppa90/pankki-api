/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeQuery } from "../db";
import * as queries from "./queries";

interface User {
    username: string,
    hash: string
}

const insertUser = async (user: User) => {
	const params = [...Object.values(user)];
	console.log(params);
    
	console.log(`Inserting a new user ${params[0]}...`);
	const result = await executeQuery(queries.insertUser, params);
	console.log("New user inserted succesfully.");
	return result;
};

const findOneUser = async (username: any) => {
	console.log(`Requesting a user with username: ${username}...`);
	const result = await executeQuery(queries.findOneUser, [username]);
	console.log(`Found ${result.rows.length} user.`);
	return result.rows;
};

const findAllUsers = async () => {
	console.log("Requesting for all users...");
	const result = await executeQuery(queries.findAllUsers);
	console.log(`Found ${result.rows.length} users.`);
	return result;
};

export default { insertUser, findOneUser, findAllUsers };