import {sessionCollection} from "../../db/db";

export const securityDevicesQueryRepository = {
    async getSessionToDeviceId(deviceId: string): Promise<any> {
        try {
            const oneSession = await sessionCollection.findOne({deviceId});
            if (!oneSession) {
                return null;
            }
            return oneSession
        } catch (error: unknown) {

        }
    }
}