import {UserDbType} from "../db/db.models";

declare global {
    namespace Express {
        export interface Request {
            userId?: UserDbType | null | string
        }
    }
}