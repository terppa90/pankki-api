import express, { Request, Response } from "express";
import usersRouter from "./usersRouter";

// Import middlewares
import { authenticate } from "./middlewares";

const server = express();
server.use(express.json());

// Routes
server.use("/api/v1/users", usersRouter);

server.get("/", (_req: Request, res: Response) => {
	res.send("/GET works");
});

server.get("/version", authenticate, (_req: Request, res: Response) => {
	res.send("/GET version 1.0");
});

export default server;