import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {ErrorsType} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";
import {errorsValidate} from "../../utils/features/errors-validate";

export const userService = {
    async createUser(user: any): Promise<string | null | ErrorsType | any> {
        const { login, password, email} = user;

        const errors = await errorsValidate(login , email);

        if (errors){
            return errors
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
    async delUser(idUser: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(idUser);
    }
}