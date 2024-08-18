import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'

config()

export const jwtService = {
    async createToken(userId: string | null): Promise<null | string> {
        try {
            console.log(SETTINGS.SECRET_KEY)

            if (!SETTINGS.SECRET_KEY) {
                console.error('SECRET_KEY не установлен');
                return null;
                //throw new Error('SECRET_KEY не установлен');
            }
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