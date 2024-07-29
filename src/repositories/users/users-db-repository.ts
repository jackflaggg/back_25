import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";

export const UsersDbRepository = {
    async createUser(body: any): Promise<any> {
        const newUser = await usersCollection.insertOne(body)

        if (!newUser || !newUser.insertedId) {
            return null;
        }
        return newUser.insertedId.toString();
    },
    async deleteUser(id: string): Promise<any> {
        const deleteUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
        return deleteUser.acknowledged;
    },
    async findByLogin(login: any): Promise<any | null> {
        return await usersCollection.findOne({login: login})
    },
    async findByEmail(email: string): Promise<any | null> {
        return await usersCollection.findOne({email: email})
    },
}