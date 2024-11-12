import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'
import {secretErrorCheck} from "../features/secret-error";
import {TokenVerificationResult, VerifiedToken} from "../../models/common/common.types";
config()

export const jwtService = {
    // Этот метод создает JWT на основе идентификатора пользователя и времени
    // В случае успеха возвращает созданный токен в виде строки
    //TODO: Порядок аргументов с необязательным параметром!
    // const token = await jwtService.createAnyToken('672bb3560fc74718033b1cd2', undefined, '1h');
    // лучше сюда подкинуть интерфейс!
    async createAccessToken(userId: string, expiresInData: string): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            return jwt.sign(
                {userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: expiresInData}
            )
        } catch (error: unknown) {
            console.error('Ошибка при создании токена:', error);
            return null;
        }
    },

    async createRefreshToken(userId: string, deviceId: string, expiresInData: string): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            return jwt.sign(
                {userId, deviceId},
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
            return jwt.decode(String(token)) as JwtPayload | null
        } catch (error: unknown) {
            console.log('Ошибка при декодировании токена: ', String(error));
            return null
        }
    },

    async verifyRefreshToken(refreshToken: string): Promise<TokenVerificationResult | null>  {
        try {
            const decoded =  jwt.verify(refreshToken, SETTINGS.SECRET_KEY) as VerifiedToken;
            return { token: decoded }
        } catch (e: unknown) {
            if (e instanceof jwt.TokenExpiredError) {
                return { expired: true };
            }
            return null
        }
    },

    async getUserIdByRefreshToken(token: string) {
        // может вернуть объект типа JwtPayload, если токен валиден, или строку, если токен недействителен
        try {
            const user = jwt.verify(token, SETTINGS.SECRET_KEY) as JwtPayload;

            if (!user || !user.userId){
                console.log('что то пошло не так при верификации токена ' + JSON.stringify(user))
                return null;
            }

            return user.userId
        } catch (error: unknown){
            if (error instanceof jwt.TokenExpiredError) {
                console.log('токен протух: ' + JSON.stringify({ expired: true }))
                return null// { expired: true };
            }
            console.log('ошибка: ' + String(error));
            return null
        }
    }
}