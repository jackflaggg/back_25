import {JwtPayload} from "jsonwebtoken";
import {UserDbType} from "../db/db.models";

declare global {
    namespace Express {
        export interface Request {
            user: JwtPayload
        }
    }
}