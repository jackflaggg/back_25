import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {hashService} from "../../utils/application/hash-service";
import {errorsUnique} from "../../utils/features/errors-validate";
import {OutUserServiceModel} from "../../models/user/ouput/output-type-users";
import {emailConfirmation} from "../../utils/features/emailConfirmation";
import {ResultError, ResultStatus, ResultSuccess} from "../../models/common/errors/errors-type";
import {helperError} from "../../utils/helpers/helper-error";

export const userService = {
    async createUser(user: Omit<OutUserServiceModel, 'createdAt' | 'emailConfirmation'>): Promise<any> {
        const { login, password, email} = user;

        const uniqueErrors = await errorsUnique( email, login );
        const js: any = '1212'
        if (uniqueErrors){
            return {
                status: ResultStatus.BadRequest,
                extensions: helperError(uniqueErrors),
                data: null
            }
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