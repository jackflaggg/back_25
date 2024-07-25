import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";

export const UsersDbRepository = {
    async createUser(): Promise<any> {

    },
    async deleteUser(id: string): Promise<any> {
        const deleteUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
        return deleteUser.acknowledged;
    }
}