import {database} from "../../db/db";

export const testingDbRepositories = {
    async deleteAllData(): Promise<void>{
        const deleteAll = await database.dropDatabase({})
        return;
    }
}