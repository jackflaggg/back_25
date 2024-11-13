import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {LoginErrorTwo} from "../../models/auth/ouput/auth.service.models";

export const devicesService = {
    async createSessionToDevice(ipDevices: string, titleDevice: string, deviceId: string, userId: string, iat: string, refreshToken: string) {
        // TODO: сделать общий result
        const deviceData = {
            issuedAt: iat,
            deviceId,
            userId,
            ip: ipDevices,
            lastActiveDate: new Date().toISOString(),
            deviceName: titleDevice,
            refreshToken
        }
        const session =  await SecurityDevicesDbRepository.createSession(deviceData);

        if (!session){
            return new LoginErrorTwo(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при создании сессии'})
        }

        return {
            status: ResultSuccess.Success,
            data: session
        }
    },

    async deleteSessionToId(deviceId: string) {
        const deleteDevice = await SecurityDevicesDbRepository.deleteSession(deviceId);
        const { acknowledged, deletedCount } = deleteDevice;
        if (!acknowledged){
            return new LoginErrorTwo(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении сессии'})
        }
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    },

    async deleteAllSessions(userId: string, refreshToken: string): Promise<any> {
        const deleteSession = await SecurityDevicesDbRepository.deleteAllSession(userId, refreshToken);
        const { acknowledged, deletedCount } = deleteSession;
        if (!acknowledged){
            return new LoginErrorTwo(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении всех, кроме текущей, сессии'})
        }
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    },

    async deleteSessionByRefreshToken(refreshToken: string){
        const deleteSession = await SecurityDevicesDbRepository.deleteSessionByRefreshToken(refreshToken);

        if (!deleteSession){
            return new LoginErrorTwo(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении всех, кроме текущей, сессии'})
        }
        const { acknowledged, deletedCount } = deleteSession;
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    }
}