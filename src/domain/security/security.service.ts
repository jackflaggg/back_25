import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {ErrorAuth, ViewModel} from "../../models/auth/ouput/auth.service.models";
import {jwtService} from "../../utils/application/jwt.service";

export const devicesService = {
    async createSessionToDevice(ipDevices: string, titleDevice: string, deviceId: string, userId: string, iat: string, refreshToken: string): Promise<ViewModel> {
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
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при создании сессии'})
        }

        return {
            status: ResultSuccess.Success,
            data: session
        }
    },

    async deleteSessionToId(deviceId: string, userId: string): Promise<ViewModel> {
        const deleteDevice = await SecurityDevicesDbRepository.deleteSession(deviceId, userId);
        if (!deleteDevice){
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении сессии'})
        }
        const { acknowledged, deletedCount } = deleteDevice;
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    },

    async deleteAllSessions(refreshToken: string): Promise<ViewModel> {
        const userId = await jwtService.getUserIdByRefreshToken(refreshToken);
        const deleteSession = await SecurityDevicesDbRepository.deleteAllSession(userId, refreshToken);

        if (!deleteSession){
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении всех, кроме текущей, сессии'})
        }

        const { acknowledged, deletedCount } = deleteSession;
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    },

    async deleteSessionByRefreshToken(refreshToken: string): Promise<ViewModel>{
        const deleteSession = await SecurityDevicesDbRepository.deleteSessionByRefreshToken(refreshToken);

        if (!deleteSession){
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении всех, кроме текущей, сессии'})
        }
        const { acknowledged, deletedCount } = deleteSession;
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    }
}