import {usersCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UserDbType} from "../../models/db/db.models";
import {OutUserFindLoginOrEmail, OutUserServiceModel} from "../../models/user/ouput/output-type-users";

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
        const searchUser = await usersCollection.findOne({login});
        if (!searchUser || !searchUser._id) {
            return null;
        }
        return searchUser;
    },
    async findByEmailUser(email: string): Promise<any | null> {
        const searchEmail =  await usersCollection.findOne({ email: email });

        if (!searchEmail || !searchEmail._id) {
            return null;
        }
        return searchEmail;
    },
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<null | OutUserFindLoginOrEmail> {

        const filter = {
            $or: [
                {login: loginOrEmail} ,
                {email: loginOrEmail}
            ]
        }
        const findUser = await usersCollection.findOne(filter)
        if (!findUser || !findUser._id) {
            return null;
        }
        return findUser;
    },
    async findCodeUser(code: string) {

        const findUser = await usersCollection.findOne({
            'emailConfirmation.confirmationCode': code
        });

        if (!findUser || !findUser._id){
            return null;
        }
        return findUser;
    },
    async updateEmailConfirmation(id: string, isConfirmed: boolean): Promise<any> {
        const updateEmail = await usersCollection.updateOne(
            {id},
            {$set: {'emailConfirmation.isConfirmed': isConfirmed}});
        return true
    },
    async updateRegistrationConfirmation(userId: string, code: string, expirationDate: string) {
        const result = await usersCollection.updateOne(
            {id: userId},
            {
                $set: {
                    'emailConfirmation.confirmationCode': code,
                    'emailConfirmation.expirationDate': expirationDate
                }
            }
        )
        return true;
    }
}