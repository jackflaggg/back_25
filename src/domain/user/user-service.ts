import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {ErrorsType, ResultStatus} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";

export const userService = {
    async createUser(user: any): Promise<string | null | ErrorsType | any> {
        const { login, password, email} = user;

        if (!login || !password || !email) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{field: 'login,password,email', message: 'All fields are required'}],
                data: null
            }
        }

        const existingUser = await UsersDbRepository.findByLoginOrEmail({
            loginOrEmail: login || email,
            password: password
            // изменить!
        })

        if (existingUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{field: 'login or email', message: 'Login or email is not unique'}],
                data: null
            }
        }

        const passwordHash = await hashService._generateHash(password);

        const newUser: any = {
            login,
            password: passwordHash,
            email,
            createdAt: new Date().toISOString()
        }
        const userCreate = await UsersDbRepository.createUser(newUser);
        return {
            status: ResultStatus.Success,
            data: userCreate
        }
    },
    async delUser(id: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(id);
    }
}