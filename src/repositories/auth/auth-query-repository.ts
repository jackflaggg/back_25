import {usersCollection} from "../../db/db";

export const authQueryRepository = {
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<any> {
        const filter = {
            $or: [
                {login: {$regex: loginOrEmail}} ,
                {email: {$regex: loginOrEmail}}
                ]
        }

        return await usersCollection.findOne(filter);
    }
}

