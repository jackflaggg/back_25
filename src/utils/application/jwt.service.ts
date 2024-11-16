import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv'
import {secretErrorCheck} from "../features/secret.error";
import {TokenVerificationResult, VerifiedToken} from "../../models/common/common.types";
import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {refreshTokenCollection} from "../../db/db";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";
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
            //if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            return jwt.sign(
                {userId, deviceId},
                SETTINGS.SECRET_KEY,
                {expiresIn: expiresInData}
            )
            //TODO: null не надо возвращать
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

    async getUserIdByRefreshToken(token: string): Promise<any | null> {
        // может вернуть объект типа JwtPayload, если токен валиден, или строку, если токен недействителен
        try {
            const user = jwt.verify(token, SETTINGS.SECRET_KEY) as JwtPayload;

            if (!user || !user.userId){
                console.log('что то пошло не так при верификации токена ' + JSON.stringify(user))
                return null;
            }

            return user.userId;
        } catch (error: unknown){
            if (error instanceof jwt.TokenExpiredError) {
                console.log('токен протух: ' + JSON.stringify({ expired: true }))
                return null// { expired: true };
            }
            console.log('ошибка: ' + String(error));
            return null
        }
    },

    async getDeviceIdByRefreshToken(refreshToken: string): Promise<any | null> {
        try {
            const device = await jwt.verify(refreshToken, SETTINGS.SECRET_KEY) as JwtPayload;
            if (!device || !device.deviceId){
                console.log('что то пошло не так при верификации токена ' + JSON.stringify(device))
                return null;
            }
            return device.deviceId;

        } catch (error: unknown) {
            if (error instanceof jwt.TokenExpiredError) {
                console.log('токен протух: ' + JSON.stringify({ expired: true }))
                return null// { expired: true };
            }
            console.log('ошибка: ' + String(error));
            return null
        }
    },

    async revokeRefreshToken(refreshToken: string, userId: string) {
        const revoke = await SecurityDevicesDbRepository.revokeToken(refreshToken, userId);
        const {acknowledged, insertedId} = revoke;

        if (!acknowledged) {
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка в бд'})
        }
        return {
            status: ResultSuccess.Success,
            data: String(insertedId)
        }
    },

    async updateRefreshToken(refreshToken: string){
        //TODO: сделать новую db
        const findRefreshToken = await refreshTokenCollection.findOne({refreshToken});
        //SecurityDevicesDbRepository.findRefreshToken(refreshToken);
        console.log(findRefreshToken)
        if (!findRefreshToken){
            console.log('ошибка1')
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'отсутствует токен'});
        }

        const deviceToken = await jwtService.getDeviceIdByRefreshToken(refreshToken);
        const userIdToken = await jwtService.getUserIdByRefreshToken(refreshToken);

        if (!deviceToken || !userIdToken){
            console.log('ошибка2')
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[jwtService]', field: 'отсутствует deviceId или userId'});
        }

        try {
            const newAccessToken = await jwtService.createAccessToken(userIdToken, '10s');
            const newRefreshToken = await jwtService.createRefreshToken(userIdToken, deviceToken, '20s');

            if (!newRefreshToken || !newAccessToken){
                console.log('ошибка3')
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[jwtService]', field: 'ошибка при создании токенов'});
            }
            const deleteOldToken = await refreshTokenCollection.deleteOne({refreshToken});
            if (!deleteOldToken.acknowledged){
                console.log('ошибка4')
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[refreshTokenCollection]', field: 'ошибка при удалении'});
            }
            const session = await SecurityDevicesDbRepository.getSessionByRefreshToken(refreshToken);
            if (!session){
                console.log('ошибка5')
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка при получении сессии'});
            }
            const updateDate = await SecurityDevicesDbRepository.updateSession(
                session.ip,
                session.issuedAt,
                session.deviceId,
                session.deviceName,
                session.userId,
                refreshToken,
                newRefreshToken!
            );
            if (!updateDate){
                console.log('ошибка6')
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка при обновлении сессии'});
            }
            return {
                status: ResultSuccess.Success,
                data: [newAccessToken, newRefreshToken]
            }

        } catch (error: unknown) {
            console.log('[jwtService] что то пошло не так!!!!', String(error));
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[jwtService]', field: 'крах создания токенов'});
        }
    }
}