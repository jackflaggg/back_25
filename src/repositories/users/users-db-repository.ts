import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";
import {OutUserServiceModel} from "../../models/user/ouput/output-type-users";

export const UsersDbRepository = {
    async createUser(body: OutUserServiceModel): Promise<string | null> {
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
        console.log(loginOrEmail);
        const filter = {
            $or: [
                {login: loginOrEmail} ,
                {email: loginOrEmail}
            ]
        }
        console.log(filter)
        console.log(await usersCollection.findOne(filter))

        return await usersCollection.findOne(filter);
    },
}