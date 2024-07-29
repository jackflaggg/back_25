import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {ErrorsType} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const userService = {
    async createUser(user: any): Promise<string | null | ErrorsType | any> {
        const { login, password, email} = user;

        // const existingUser = await UsersDbRepository.findByLoginOrEmail({
        //     loginOrEmail: login || email,
        // })
        // console.log('this is : ' + existingUser)
        //
        // if (existingUser) {
        //     return {
        //         status: ResultStatus.BadRequest,
        //         extensions: [{field: 'login or email', message: 'Login or email is not unique'}],
        //         data: null
        //     }
        // }

        const passwordHash = await hashService._generateHash(password);

        const newUser: any = {
            login,
            password: passwordHash,
            email,
            createdAt: new Date().toISOString()
        }
        return await UsersDbRepository.createUser(newUser);

    },
    async delUser(id: string): Promise<boolean> {
        return await UsersDbRepository.deleteUser(id);
    }
}