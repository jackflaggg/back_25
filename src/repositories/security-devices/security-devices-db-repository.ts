import {deviceMapper} from "../../utils/mappers/device-mapper";
import {sessionCollection} from "../../db/db";
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

        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    },
    //TODO: нужно сделать: удаление всех сессий, кроме текущей!
    async deleteAllSession(deviceId: string): Promise<any> {
        try {

        } catch (error: unknown){
            console.log('[SecurityDevicesDbRepository] Непредвиденная ошибка в бд! ', String(error));
            return null;
        }
    }
}