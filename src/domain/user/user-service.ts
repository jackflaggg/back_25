import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {ErrorsType} from "../../models/common-types";
import {usersCollection} from "../../db/db";

export const userService = {
    async createUser(user: any): Promise<string | null | ErrorsType> {
        const { login, password, email} = user;

        const errors: ErrorsType = {
            errorsMessages: []
        }

        const loginTest = await usersCollection.findOne({login});
        if (loginTest) {
            errors.errorsMessages.push({message: 'login should be unique', field: "login"});
            return errors
        }

        const emailTest = await usersCollection.findOne({email});
        if (emailTest) {
            errors.errorsMessages.push({message: 'email should be unique', field: "email"});
            return errors
        }

        const newUser: any = {
            login,
            password,
            email
        }
        return await UsersDbRepository.createUser(newUser);
    },
    async delUser(id: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(id);
    }
}