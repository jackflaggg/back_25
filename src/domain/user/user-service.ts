import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {HTTP_STATUSES, ResultError} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";
import {errorsValidate} from "../../utils/features/errors-validate";
import {CreateUserServiceModel} from "../../models/user/input/CreateServiceModelUser";

export const userService = {
    async createUser(user: CreateUserServiceModel): Promise<string | ResultError> {
        const { login, password, email} = user;

        const errors = await errorsValidate( email, login );

        if (errors){
            return {
                status: String(HTTP_STATUSES.BAD_REQUEST_400),
                data: errors
            } as ResultError
        }

        const passwordHash = await hashService._generateHash({password});

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