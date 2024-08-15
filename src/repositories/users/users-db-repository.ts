import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";

export const UsersDbRepository = {
    async createUser(body: CreateMapperUser): Promise<string | null> {
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
    async findByLoginUser(login: string): Promise<UserDbType | null> {
        return await usersCollection.findOne({ login: login })
    },
    async findByEmailUser(email: string): Promise<any | null> {
        return await usersCollection.findOne({ email: email })
    },
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<null | any> {

        const filter = {
            $or: [
                {login: loginOrEmail} ,
                {email: loginOrEmail}
            ]
        }

        return await usersCollection.findOne(filter);
    },
}