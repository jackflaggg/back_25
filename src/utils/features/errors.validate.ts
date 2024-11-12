import {UsersDbRepository} from "../../repositories/users/users.db.repository";
import {ErrorsType} from "../../models/common/errors/errors.type";

export const errorsUnique =  async (email: string, login: string): Promise<ErrorsType | false> => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    const existingUserByEmail = await UsersDbRepository.findByEmailUser(email);

    const existingUserByLogin = await UsersDbRepository.findByLoginUser(login);

    if (existingUserByEmail) {
        errors.errorsMessages.push({message: `not unique ${existingUserByEmail.email}`, field: "email"})
    }

    if (existingUserByLogin) {
        errors.errorsMessages.push({message: `not unique ${existingUserByLogin.login}`, field: "login"})
    }

    return  errors.errorsMessages.length > 0 ? errors : false;
}