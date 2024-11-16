import {refreshTokenCollection, sessionCollection} from "../../db/db";
import {InDeviceSession} from "../../models/devices/input/create.device.session.model";

export const SecurityDevicesDbRepository = {
    async createSession(modelDevice: InDeviceSession): Promise<string | null> {
        try {
            const lastActiveDate = new Date().toISOString();
            const session = {
                deviceId: modelDevice.deviceId,
                userId: modelDevice.userId,
                ip: modelDevice.ip,
                deviceName: modelDevice.deviceName,
                refreshToken: modelDevice.refreshToken,
                lastActiveDate,
                issuedAt: lastActiveDate,
            }
            const createSession = await sessionCollection.insertOne(session);
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
            return await refreshTokenCollection.deleteMany({userId, refreshToken: {$ne: refreshToken}});
        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async revokeToken(userId: string, refreshToken: string): Promise<any> {
        try {
            return await refreshTokenCollection.insertOne({userId, refreshToken});
        } catch (error: unknown) {
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async deleteSessionByRefreshToken(refreshToken: string) {
        try {
            return await sessionCollection.deleteOne({refreshToken});
        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async findRefreshToken(refreshToken: string){
        try {
            const findToken = await refreshTokenCollection.findOne({refreshToken});
            if (!findToken) {
                return null;
            }
            return findToken
        } catch (error: unknown) {
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },

    async getSessionByRefreshToken(refreshToken: string) {
        const dateSession = await sessionCollection.findOne({refreshToken});
        if (!dateSession) {
            return null
        }
        return dateSession;
    },

    async updateSession(ip: string, issuedAt: string, deviceId: string, deviceTitle: string, userId: string, oldRefreshToken: string, newRefreshToken: string) {
        const lastActiveDate = new Date().toISOString();
        const deviceName = deviceTitle;

        const session = await SecurityDevicesDbRepository.getSessionByRefreshToken(oldRefreshToken);
        if (!session){
            return null
        }

        const result = await sessionCollection.updateOne({refreshToken: oldRefreshToken},
            {
                        $set: {
                            issuedAt,
                            lastActiveDate,
                            deviceId,
                            ip,
                            deviceName,
                            userId,
                            refreshToken: newRefreshToken
                        }
            });

        if (!result.acknowledged){
            return null
        }
        return result

    }
}