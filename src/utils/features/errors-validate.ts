import {ErrorsType} from "../../models/common/common-types";
import {UsersDbRepository} from "../../repositories/users/users-db-repository";

export const errorsValidate =  async (email: string, login: string) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    const existingUserByEmail = await UsersDbRepository.findByEmail(email);

    const existingUserByLogin = await UsersDbRepository.findByLogin(login);

    if (existingUserByEmail) {
        errors.errorsMessages.push({message: `not unique ${existingUserByEmail.email}`, field: "email"})
        return errors
    }

    if (existingUserByLogin) {
        errors.errorsMessages.push({message: `not unique ${existingUserByLogin.login}`, field: "login"})
        return true
    }

    return false
}