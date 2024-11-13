import {sessionCollection} from "../../db/db";

export const securityDevicesQueryRepository = {
    async getSessionToUserId(userId: string): Promise<any> {
        try {
            const oneSession = await sessionCollection.findOne({userId});
            if (!oneSession) {
                return null;
            }
            return oneSession
        } catch (error: unknown) {
            return null
        }
    }
}