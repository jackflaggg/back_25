import {Result, ResultStatus} from "../../models/common/common-types";
import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/helpers/helper-hash";

export const authService = {
    async loginUser(loginOrEmail: any, password: any): Promise<Result<any | null>> {
        const userAuth = await this.authenticateUser(loginOrEmail, password)
        if (userAuth.status === ResultStatus.Unauthorized) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: userAuth.extensions,
                data: null
            }
        }
        return {
            status: ResultStatus.Success,
            data: userAuth.data
        }
    },
    async authenticateUser(loginOrEmail: any, password: any): Promise<Result<string | null>> {
        const userAuth = await UsersDbRepository.findByLoginOrEmail(loginOrEmail)
        if (!userAuth) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{field: 'login or email', message: 'Login or email is not unique'}],
                data: null
            }
        }
        const result = await hashService.comparePassword(password, password)
        if (!result) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{field: 'password', message: 'Password is wrong'}],
                data: null
            }
        }
        return {
            status: ResultStatus.Success,
            data: userAuth._id.toString()
        }
    }
}