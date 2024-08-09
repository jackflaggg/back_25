import {SETTINGS} from "../../settings";
import jwt from "jsonwebtoken";

export const jwtService = {
    async createToken(userId: string | null): Promise<string | null> {
        try {
            return jwt.sign(
                {userId: userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: SETTINGS.TOKEN_DURATION}
            )
        }catch (error: unknown) {
            console.error('Ошибка при создании токена:', error);
            return null;
        }
    },

    async decodeToken(token: string): Promise<any>  {
        try {
            return jwt.decode(token)
        } catch (error: unknown) {
            console.error('Ошибка при декодировании токена: ', error)
            return null
        }
    },

    async verifyToken(token: string): Promise<any>  {
        try {
            return jwt.verify(token, SETTINGS.SECRET_KEY)
        } catch (error: unknown) {
            console.error('Ошибка при верификации токена: ', error)
            return null
        }
    }
}