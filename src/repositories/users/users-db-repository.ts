import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";
import {OutUserFindLoginOrEmail, OutUserServiceModel} from "../../models/user/ouput/output-type-users";
import {emailConfirmation} from "../../utils/features/emailConfirmation";

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
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<null | OutUserFindLoginOrEmail> {

        const filter = {
            $or: [
                {login: loginOrEmail} ,
                {email: loginOrEmail}
            ]
        }
        const findUser = await usersCollection.findOne(filter)
        return findUser;
    },
    async findCodeUser(code: string) {

        const findUser = await usersCollection.findOne({
            'emailConfirmation.confirmationCode': code
        });

        if (!findUser || !findUser.id){
            return null;
        }
        return findUser;
    }
}