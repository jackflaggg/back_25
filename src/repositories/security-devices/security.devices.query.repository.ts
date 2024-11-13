import {sessionCollection} from "../../db/db";
import {outDeviceMapper} from "../../utils/mappers/device.mapper";

export const securityDevicesQueryRepository = {
    async getSessionToUserId(userId: string) {
        try {
            const oneSession = await sessionCollection.findOne({userId});
            if (!oneSession) {
                return null;
            }
            return outDeviceMapper(oneSession);
        } catch (error: unknown) {
            return null
        }
    }
}