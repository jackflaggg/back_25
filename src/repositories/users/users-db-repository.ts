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
        const filterLogin = {login: { $regex: login, $options: 'i' }} ;
        return await usersCollection.findOne(filterLogin)
    },
    async findByEmail(email: any): Promise<any | null> {
        const filterEmail = { email: { $regex: email, $options: 'i' }};
        return await usersCollection.findOne(filterEmail)
    },
}