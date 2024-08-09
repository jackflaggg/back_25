import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {HTTP_STATUSES, ResultError} from "../../models/common/common-types";
import {hashService} from "../../utils/application/hash-service";
import {errorsValidate} from "../../utils/features/errors-validate";
import {CreateUserServiceModel} from "../../models/user/input/CreateServiceModelUser";
import {userMapperToCreate} from "../../utils/mappers/user-mapper";

export const userService = {
    async createUser(user: CreateUserServiceModel): Promise<string | ResultError | null> {
        const { login, password, email} = user;

        const errors = await errorsValidate( email, login );

        if (errors){
            return {
                status: String(HTTP_STATUSES.BAD_REQUEST_400),
                data: errors
            } as ResultError
        }

        const passwordHash = await hashService._generateHash(password);

        const newUser = userMapperToCreate(login, email, passwordHash);

        return await UsersDbRepository.createUser(newUser);

    },
    async delUser(idUser: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(idUser);
    }
}