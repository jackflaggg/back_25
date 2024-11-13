import {sessionCollection} from "../../db/db";

export const securityDevicesQueryRepository = {
    async getSessionToUserId(userId: string) {
        try {
            const oneSession = await sessionCollection.find({userId}).toArray();
            if (!oneSession) {
                return null;
            }
            return oneSession;
        } catch (error: unknown) {
            return null
        }
    }
}