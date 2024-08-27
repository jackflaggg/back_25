import {UserDbType} from "../../models/db/db.models";

declare global {
    namespace Express {
        export interface Request {
            userId?: UserDbType | null | string
        }
    }
}