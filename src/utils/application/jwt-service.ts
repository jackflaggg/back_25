import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'
import {secretErrorCheck} from "../features/secret-error";
import {ObjectId} from "mongodb";
config()

export const jwtService = {
    // Этот метод создает JWT на основе идентификатора пользователя и времени
    // В случае успеха возвращает созданный токен в виде строки
    async createAnyToken(userId: string, expiresInData: string = SETTINGS.TOKEN_DURATION): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
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
        console.log('тип токена: ' + typeof token + ': сам токен: ' + token)
        try {
            return jwt.decode(String(token)) as JwtPayload | null
        } catch (error: unknown) {
            console.error('Ошибка при декодировании токена: ', error)
            return null
        }
    },

    // этот метод проверяет действительность токена + проверка на срок действия
    // Если токен действителен, метод возвращает объект с данными JwtPayload (payload)
    async verifyAccessToken(token: string): Promise<string | JwtPayload | null>  {
        console.log('тип токена: ' + typeof token + ': сам токен: ' + token)
        try {
            return jwt.verify(String(token), SETTINGS.SECRET_KEY)// as JwtPayload | null
        } catch (error: unknown) {
            if (error instanceof jwt.TokenExpiredError) {
                return { expired: true };
            }
            console.error('Ошибка при верификации токена: ', error)
            return null
        }
    },

    async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | string | null>  {
        try {
            return jwt.verify(refreshToken, SETTINGS.SECRET_KEY)
        } catch (e: unknown) {
            if (e instanceof jwt.TokenExpiredError) {
                return { expired: true };
            }
            return null
        }
    },

    async getUserIdByToken(token: string) {
        // TODO: ошибка с которой можно столкнуться:
        // может вернуть объект типа JwtPayload, если токен валиден, или строку, если токен недействителен
        try {
            const user = jwt.verify(token, SETTINGS.SECRET_KEY) as JwtPayload;

            if (!user || !user.userId){
                console.log('что то пошло не так при верификации токена ' + JSON.stringify(user))
                return null;
            }

            return user.userId
        } catch (error: unknown){
            console.log('я попал в блок catch , видимо что-то пошло не так при преобразовании!')

            if (error instanceof jwt.TokenExpiredError) {
                return null// { expired: true };
            }

            console.log(error);

            return null
        }
    }
}