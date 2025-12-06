import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {id: number, role: string};
        }
    }
}