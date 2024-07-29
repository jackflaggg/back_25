import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {ErrorsType} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";

export const userService = {
    async createUser(user: any): Promise<string | null | ErrorsType | any> {
        const { login, password, email} = user;

        const errors: ErrorsType = {
            errorsMessages: []
        }

        const existingUserByEmail = await UsersDbRepository.findByEmail(email);

        const existingUserByLogin = await UsersDbRepository.findByLogin(login);

        if (existingUserByEmail) {
            errors.errorsMessages.push({message: `not unique ${existingUserByEmail.email}`, field: "email"})
            return null
        }

        if (existingUserByLogin) {
            errors.errorsMessages.push({message: `not unique ${existingUserByLogin.login}`, field: "login"})
            return null
        }

        const passwordHash = await hashService._generateHash(password);

        const newUser: any = {
            login,
            password: passwordHash,
            email,
            createdAt: new Date().toISOString()
        }
        return await UsersDbRepository.createUser(newUser);

    },
    async delUser(id: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(id);
    }
}