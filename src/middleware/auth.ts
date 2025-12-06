import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "customer"]
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers.authorization;

            if (!authToken || !authToken.startsWith("Bearer ")) {
                return res.status(401).json({ message: "You are not allowed!!" });
            }

            const finalToken = authToken.split(" ")[1] as string;

            const decoded = jwt.verify(finalToken, config.jwtSecret as string) as JwtPayload & {
                id: number;
                role: string;
            };

            console.log({ decoded });

            req.user = decoded;

            // ["admin"]
            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(401).json({
                    error: "unauthorized!!",
                })
            }

            next();
        } catch (err: any) {
            res.status(403).json({
                success: false,
                message: err.message,
            });
        }
    };
};

export default auth;