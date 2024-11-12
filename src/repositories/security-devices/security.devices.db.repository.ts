import {deviceMapper} from "../../utils/mappers/device.mapper";
import {refreshTokenCollection, sessionCollection} from "../../db/db";
import {InDeviceSession} from "../../models/devices/input/create.device.session.model";

export const SecurityDevicesDbRepository = {
    async createSession(modelDevice: InDeviceSession): Promise<string | null> {
        try {

            const dateDeviceMap = deviceMapper(modelDevice);
            const createSession = await sessionCollection.insertOne(dateDeviceMap);

            if (!createSession) {
                return null;
            }
            return String(createSession.insertedId);

        } catch (error: unknown) {
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async deleteSession(deviceId: string): Promise<any> {
        try {
            return await sessionCollection.deleteOne({deviceId})
        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    //TODO: нужно сделать: удаление всех сессий, кроме текущей!
    async deleteAllSession(userId: string, refreshToken: string): Promise<any> {
        try {
            const deleteSessions = await refreshTokenCollection.deleteMany({userId, refreshToken: {$ne: refreshToken}});
            if (!deleteSessions.acknowledged) {
                console.log('[SecurityDevicesDbRepository] Не получилось удалить сессии! ');
                return null;
            }
            return deleteSessions;
        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async revokeToken(userId: string, refreshToken: string): Promise<any> {
        try {
            const revokeToken = await refreshTokenCollection.insertOne({userId, refreshToken});
            if (!revokeToken.acknowledged) {
                console.log('[SecurityDevicesDbRepository] Не получилось отозвать токен! ');
                return null;
            }
            return revokeToken;

        } catch (error: unknown) {
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async deleteSessionByRefreshToken(refreshToken: string) {
        try {
            const deleteRefresh =  await sessionCollection.deleteOne({refreshToken});
            if (!deleteRefresh.acknowledged) {
                console.log('[SecurityDevicesDbRepository] Не получилось отозвать токен! ');
                return null;
            }
            return deleteRefresh;
        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    }
}