import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {LoginErrorTwo} from "../../models/auth/ouput/auth.service.models";

export const devicesService = {
    async writeData(ipDevices: string, titleDevice: string, deviceId: string, lastActiveDate: string, refreshToken: string): Promise<any> {
        const deviceData = {
            issuedAt: lastActiveDate,
            deviceId,
            ip: ipDevices,
            lastActiveDate: new Date().toISOString(),
            deviceName: titleDevice,
            refreshToken
        }
        const session =  await SecurityDevicesDbRepository.createSession(deviceData);

        if (!session){
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'SecurityDevicesDbRepository', message: 'ошибка при создании сессии'},
                data: session
            }
        }

        return {
            status: ResultSuccess.Success,
            data: session
        }
    },
    async deleteDevice(deviceId: string): Promise<any> {
        const deleteDevice = await SecurityDevicesDbRepository.deleteSession(deviceId);
        const { acknowledged, deletedCount } = deleteDevice;
        if (!acknowledged){
            return new LoginErrorTwo(ResultStatus.BadRequest, {field: 'SecurityDevicesDbRepository', message: 'ошибка при удалении сессии'})
        }
        return {
            status: ResultSuccess.Success,
            data: deletedCount
        }
    }
}