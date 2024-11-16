import {SETTINGS} from "../../settings";
import jwt, {JwtPayload} from "jsonwebtoken";
import {secretErrorCheck} from "../features/secret.error";
import {TokenVerificationResult, VerifiedToken} from "../../models/common/common.types";
import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {refreshTokenCollection} from "../../db/db";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";

export const jwtService = {
    async createAccessToken(userId: string): Promise<null | string> {
        try {
            if (!secretErrorCheck(SETTINGS.SECRET_KEY)) return null;
            return jwt.sign(
                {userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: SETTINGS.EXPIRES_IN_ACCESS_TOKEN}
            )
        } catch (error: unknown) {
            console.error('Ошибка при создании токена:', error);
            return null;
        }
    },

    async createRefreshToken(userId: string, deviceId: string): Promise<null | string> {
        try {
            return jwt.sign(
                {userId, deviceId},
                SETTINGS.SECRET_KEY,
                {expiresIn: SETTINGS.EXPIRES_IN_REFRESH_TOKEN}
            )
            //TODO: null не надо возвращать
        }catch (error: unknown) {
            console.error('Ошибка при создании токена:', error);
            return null;
        }
    },

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

    async revokeRefreshToken(refreshToken: string) {
        const revoke = await refreshTokenCollection.findOne({refreshToken});

        if (!revoke) {
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка в бд'})
        }
        const userId = await this.getUserIdByRefreshToken(refreshToken);
        if (!userId){
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка в бд'})
        }

        try {
            const verifyToken = await jwtService.verifyRefreshToken(refreshToken);

            await refreshTokenCollection.deleteOne({refreshToken});
            return {
                status: ResultSuccess.Success,
                data: String(verifyToken)
            }
        } catch (error: unknown) {
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка в бд'})
        }
    },

    async updateRefreshToken(refreshToken: string){

        const findRefreshToken = await refreshTokenCollection.findOne({refreshToken});

        if (!findRefreshToken){
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'отсутствует токен'});
        }

        const deviceIdToken = await jwtService.getDeviceIdByRefreshToken(refreshToken);
        const userIdToken = await jwtService.getUserIdByRefreshToken(refreshToken);

        if (!deviceIdToken || !(userIdToken)) {
            return new ErrorAuth(ResultStatus.Forbidden, {message: '[jwtService]', field: 'отсутствует deviceId или userId'});
        }

        try {
            const newAccessToken = await jwtService.createAccessToken(userIdToken);
            const newRefreshToken = await jwtService.createRefreshToken(userIdToken, deviceIdToken);

            if (!newRefreshToken || !newAccessToken){
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[jwtService]', field: 'ошибка при создании токенов'});
            }
            await refreshTokenCollection.deleteOne({refreshToken});

            const session = await SecurityDevicesDbRepository.getSessionByRefreshToken(refreshToken);
            if (!session){
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
                return new ErrorAuth(ResultStatus.Forbidden, {message: '[SecurityDevicesDbRepository]', field: 'ошибка при обновлении сессии'});
            }
            return {
                status: ResultSuccess.Success,
                data: [newAccessToken, newRefreshToken]
            }

        } catch (error: unknown) {
            console.log('[jwtService] что то пошло не так!!!!', String(error));
            return null
        }
    }
}