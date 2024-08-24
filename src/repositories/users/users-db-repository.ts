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
        console.log(email);
        const searchEmail =  await usersCollection.findOne({ email: email });
        console.log(searchEmail)
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
        console.log('найденный пользователь по коду: ' + findUser)
        return findUser;
    },
    async updateEmailConfirmation(id: string): Promise<boolean> {
        const updateEmail = await usersCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {'emailConfirmation.isConfirmed': true}});

        return updateEmail.modifiedCount === 1;
    },
    async updateCodeAndDateConfirmation(userId: string, code: string, expirationDate: Date) {
        const result = await usersCollection.updateOne(
            {_id: new ObjectId(userId)},
            {
                $set: {
                    'emailConfirmation.confirmationCode': code,
                    'emailConfirmation.expirationDate': expirationDate
                }
            }
        )
        return result.modifiedCount === 1;
    }
}