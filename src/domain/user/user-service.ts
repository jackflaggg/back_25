import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {hashService} from "../../utils/application/hash-service";
import {errorsUnique} from "../../utils/features/errors-validate";
import {OutUserServiceModel} from "../../models/user/ouput/output-type-users";
import {emailConfirmation} from "../../utils/features/emailConfirmation";
import {ResultError, ResultStatus, ResultSuccess} from "../../models/common/errors/errors-type";

export const userService = {
    async createUser(user: Omit<OutUserServiceModel, 'createdAt' | 'emailConfirmation'>): Promise<any/*string | ResultError | null*/> {
        const { login, password, email} = user;

        const errors = await errorsUnique( email, login );

        if (errors){
            return {
                status: ResultStatus.BadRequest,
                data: errors
            } as ResultError
        }

        const passwordHash = await hashService._generateHash(password);

        const newUser = {
            login,
            email,
            password: passwordHash,
            createdAt: new Date().toISOString(),
            emailConfirmation: emailConfirmation()
        }

        const createUser = await UsersDbRepository.createUser(newUser);
        return {
            status: ResultSuccess.Success,
            data: createUser
        }

    },
    async delUser(idUser: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(idUser);
    }
}