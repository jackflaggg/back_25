import {usersCollection} from "../../db/db";

export const authQueryRepository = {
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<any> {
        const filter = {
            $or: [
                {login: {$regex: loginOrEmail, $options: 'i'}} ,
                {email: {$regex: loginOrEmail, $options: 'i'}}
                ]
        }
        console.log(await usersCollection.findOne(filter))
        return await usersCollection.findOne(filter);
    }
}

