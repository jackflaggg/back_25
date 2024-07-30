import {usersCollection} from "../../db/db";

export const authService = {
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<null | any> {

        const filter = {
            $or: [
                {login: loginOrEmail} ,
                {email: loginOrEmail}
            ]
        }

        return await usersCollection.findOne(filter);
    }
}

