import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
	const auth = req.get("Authorization");
	if (!auth?.startsWith("Bearer ")) {
		return res.status(401).send("Invalid token");
	}
	const token = auth.substring(7);
	const secret = process.env.SECRET ?? "";
	try {
		const decodedToken = jwt.verify(token, secret);
		req.user = decodedToken;
		next();
	} catch (error) {
		return res.status(401).send("Invalid token");
	}
};