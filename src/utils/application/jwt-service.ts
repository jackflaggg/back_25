import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'
import {secretErrorCheck} from "../features/secret-error";
config()

export const jwtService = {
    // Этот метод создает JWT на основе идентификатора пользователя
    async createToken(userId: string | null, expiresInData: string = SETTINGS.TOKEN_DURATION): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            console.log('вот твое время токена: ' + expiresInData);
            return jwt.sign(
                {userId: userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: expiresInData}
            )
        }catch (error: unknown) {
            console.error('Ошибка при создании токена:', error);
            return null;
        }
    },

    async decodeToken(token: string): Promise<null | JwtPayload>  {
        try {
            return jwt.decode(token) as JwtPayload | null
        } catch (error: unknown) {
            console.error('Ошибка при декодировании токена: ', error)
            return null
        }
    },

    async verifyToken(token: string): Promise<null | JwtPayload >  {
        try {
            return jwt.verify(token, SETTINGS.SECRET_KEY) as JwtPayload | null
        } catch (error: unknown) {
            console.error('Ошибка при верификации токена: ', error)
            return null
        }
    }
}