import {deviceMapper} from "../../utils/mappers/device-mapper";
import {sessionCollection} from "../../db/db";
import {InDeviceSession} from "../../models/devices/input/create.device.session.model";

export const SecurityDevicesDbRepository = {
    async createSession(modelDevice: InDeviceSession): Promise<any> {
        try {

            const dateDeviceMap = deviceMapper(modelDevice);
            const createSession = await sessionCollection.insertOne(dateDeviceMap);

            if (!createSession) {
                return null;
            }
            return createSession.insertedId;

        } catch (error: unknown) {
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },
    async deleteSession(deviceId: string): Promise<any> {

    },
    async deleteAllSession(deviceId: string): Promise<any> {

    }
}