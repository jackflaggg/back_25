import {UsersDbRepository} from "../../repositories/users/users.db.repository";
import {hashService} from "../../utils/application/hash.service";
import {errorsUnique} from "../../utils/features/errors.validate";
import {OutUserServiceModel} from "../../models/user/ouput/output.type.users";
import { ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {helperError} from "../../utils/helpers/helper.error";
import {OutCreateUserError, OutCreateUserSuccess} from "../../models/user/ouput/user.service.models";
import {ErrorAuth, ViewModel} from "../../models/auth/ouput/auth.service.models";

export const userService = {
    async createUser(user: Omit<OutUserServiceModel, 'createdAt' | 'emailConfirmation'>): Promise<OutCreateUserSuccess | OutCreateUserError> {
        const { login, password, email} = user;

        const uniqueErrors = await errorsUnique( email, login );

        if (uniqueErrors){
            return new OutCreateUserError(
                ResultStatus.BadRequest,
                helperError(uniqueErrors),
                null
            )}

        const passwordHash = await hashService._generateHash(password);

        const newUser = {
            login,
            email,
            password: passwordHash,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: null,
                expirationDate: null,
                isConfirmed: true
            }
        }

        const createUser = await UsersDbRepository.createUser(newUser);
        if (!createUser){
            return new OutCreateUserError(
                ResultStatus.BadRequest,
                {field: 'user', message: 'ошибка при создании юзера'},
                null)
        }

        return new OutCreateUserSuccess(
            ResultSuccess.Success,
            createUser
    )},
    async delUser(idUser: string): Promise<ViewModel> {
        const deleteUser = await UsersDbRepository.deleteUser(idUser);
        if (!deleteUser){
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'UsersDbRepository', message: 'ошибка при удалении'});
        }
        return {
            status: ResultSuccess.Success,
            data: deleteUser
        }
    }
}