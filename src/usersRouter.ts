import express, { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import dao from "./db/usersDao";

const router = express.Router();

interface User {
    username: string,
    hash: string
}

let users: Array<User> = [];

router.get("/", async (_req, res) => {
	const result = await dao.findAllUsers();
	res.send(result.rows);
});

router.post("/register", async (req: Request, res: Response) => {
	const { username, password } = req.body;
    
	if (!username || !password) {
		return res.status(400).send("No username or password");
	}

	const hash = await argon2.hash(password);
	const user: User = { username, hash };

	await dao.insertUser(user);

	users = users.concat(user);
	
	res.status(201).send({ message: "User registered succesfully."});
});

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const existingUser = await dao.findOneUser(username);
    
	const isValidPassword = await argon2.verify(existingUser[0].password, password);
	if (!isValidPassword) {
		return res.status(401).send("Invalid password");
	}

	const payload = { username: username };
	const secret = process.env.SECRET ?? "";
	const options = { expiresIn: "15min"};

	const encodedToken = jwt.sign(payload, secret, options);

	return res.status(201).send(encodedToken);
});

export default router;