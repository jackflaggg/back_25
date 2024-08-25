import {config} from 'dotenv'
import jwt, {JwtPayload} from "jsonwebtoken";
import {SETTINGS} from "../../settings";
config()

export const refreshService = {
    async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | null>  {
        try {
            return jwt.verify(refreshToken, SETTINGS.SECRET_KEY) as JwtPayload;
        } catch (e: unknown) {
            //TODO: как обработать ошибку токена, истечение токена!
            console.log(e);
            return null
        }
    },
    async generateAnyToken(userId: string, expiresInData: string = SETTINGS.TOKEN_DURATION): Promise<any>  {
        try {
            return jwt.sign(
                {userId: userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: expiresInData});

        } catch (e: unknown) {
            //TODO: как обработать ошибку токена, истечение токена!
            console.error(e);
            return null
        }
    }
}