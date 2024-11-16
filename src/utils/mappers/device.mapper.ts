import {InDeviceSession} from "../../models/devices/input/create.device.session.model";
import {WithId} from "mongodb";
import {SessionCollection} from "../../models/db/db.models";

export const deviceMapper = (model: InDeviceSession) => {
    return {
        deviceId: model.deviceId,
        userId: model.userId,
        ip: model.ip,
        title: model.deviceName,
        refreshToken: model.refreshToken,
    }
}

export const outDeviceMapper = (model: WithId<SessionCollection>) => {
    return {
        ip: model.ip,
        title: model.deviceName,
        lastActiveDate: model.lastActiveDate,
        deviceId: model.deviceId,
    }
}