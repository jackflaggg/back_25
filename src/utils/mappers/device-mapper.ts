import {InDeviceSession} from "../../models/devices/input/create.device.session.model";

export const deviceMapper = (model: InDeviceSession) => {
    return {
        issuedAt: model.issuedAt,
        deviceId: model.deviceId,
        ip: model.ip,
        lastActiveDate: model.lastActiveDate,
        deviceName: model.deviceName,
        refreshToken: model.refreshToken,
    }
}