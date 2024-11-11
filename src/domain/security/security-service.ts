import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security-devices-db-repository";

export const devicesService = {
    async writeData(ipDevices: string, titleDevice: string, deviceId: string, lastActiveDate: string, refreshToken: string): Promise<void> {
        const deviceData = {
            issuedAt: lastActiveDate,
            deviceId,
            ip: ipDevices,
            lastActiveDate: new Date().toISOString(),
            deviceName: titleDevice,
            refreshToken
        }
        return await SecurityDevicesDbRepository.createSession(deviceData);
    }
}