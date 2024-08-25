import {config} from 'dotenv'
import jwt, {JwtPayload} from "jsonwebtoken";
import {SETTINGS} from "../../settings";
config()

export const RefreshService = {
    async generateRefreshToken(refreshToken: string): Promise<JwtPayload | null>  {
        try {
            return jwt.verify(refreshToken, SETTINGS.SECRET_KEY) as JwtPayload;
        } catch (e: unknown) {
            //TODO: как обработать ошибку токена, истечение токена!
            console.error(e);
            return null
        }
    },
    async generateAnyToken(userId: string, timeToString: string): Promise<any>  {
        try {

            return jwt.sign(
                {userId: userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: timeToString});

        } catch (e: unknown) {
            //TODO: как обработать ошибку токена, истечение токена!
            console.error(e);
            return null
        }
    }
}