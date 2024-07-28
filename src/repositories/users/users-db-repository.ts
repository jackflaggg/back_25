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
    async findByLoginOrEmail(inputAuth: any): Promise<any | null> {
        const filter = {
            $or: [
                {login: inputAuth.loginOrEmail},
                {email: inputAuth.loginOrEmail},
            ]
        }
        return await usersCollection.findOne(filter)
    }
}