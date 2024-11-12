import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security-devices-db-repository";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors-type";

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
    }
}