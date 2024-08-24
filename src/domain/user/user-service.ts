import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {HTTP_STATUSES, ResultError} from "../../models/common/common-types";
import {hashService} from "../../utils/application/hash-service";
import {errorsUnique} from "../../utils/features/errors-validate";
import {OutUserServiceModel} from "../../models/user/ouput/output-type-users";
import {emailConfirmation} from "../../utils/features/emailConfirmation";

export const userService = {
    async createUser(user: Omit<OutUserServiceModel, 'createdAt' | 'emailConfirmation'>): Promise<string | ResultError | null> {
        const { login, password, email} = user;

        const errors = await errorsUnique( email, login );

        if (errors){
            return {
                status: String(HTTP_STATUSES.BAD_REQUEST_400),
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

        return await UsersDbRepository.createUser(newUser);

    },
    async delUser(idUser: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(idUser);
    }
}