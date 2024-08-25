import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'
import {secretErrorCheck} from "../features/secret-error";
config()

export const jwtService = {
    // Этот метод создает JWT на основе идентификатора пользователя и времени
    // В случае успеха возвращает созданный токен в виде строки
    async createAnyToken(userId: string | null, expiresInData: string = SETTINGS.TOKEN_DURATION): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            console.log(userId)
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

    // Этот метод просто декодирует JWT. Он не проверяет его действительность или подпись
    // Извлекает и возвращает полезные данные
    async decodeToken(token: string): Promise<null | JwtPayload>  {
        try {
            return jwt.decode(token) as JwtPayload | null
        } catch (error: unknown) {
            console.error('Ошибка при декодировании токена: ', error)
            return null
        }
    },

    // этот метод проверяет действительность токена + проверка на срок действия
    // Если токен действителен, метод возвращает объект с данными JwtPayload (payload)
    async verifyAccessToken(token: string): Promise<null | JwtPayload >  {
        console.log('начало:' + SETTINGS.EXPIRES_IN_ACCESS_TOKEN)
        try {
            return jwt.verify(token, SETTINGS.EXPIRES_IN_ACCESS_TOKEN!) as JwtPayload | null
        } catch (error: unknown) {
            console.error('Ошибка при верификации токена: ', error)
            return null
        }
    },

    async verifyRefreshToken(refreshToken: string): Promise<any | JwtPayload | null>  {
        console.log('начало:' + SETTINGS.EXPIRES_IN_REFRESH_TOKEN)
        try {
            return jwt.verify(refreshToken, SETTINGS.EXPIRES_IN_REFRESH_TOKEN!) //as JwtPayload;
        } catch (e: unknown) {
            //TODO: как обработать ошибку токена, истечение токена!
            console.log('провал!')
            console.log(e);
            return null
        }
    }
}