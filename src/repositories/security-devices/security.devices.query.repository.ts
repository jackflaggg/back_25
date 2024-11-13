import {sessionCollection} from "../../db/db";
import {deviceMapper} from "../../utils/mappers/device.mapper";

export const securityDevicesQueryRepository = {
    async getSessionToUserId(userId: string) {
        try {
            const oneSession = await sessionCollection.find({userId}).toArray();
            if (!oneSession) {
                return null;
            }
            return oneSession.map(elem => deviceMapper(elem));
        } catch (error: unknown) {
            return null
        }
    }
}