import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/helpers/helper-hash";

// export const authService = {
//     async loginUser(loginOrEmail: any, password: any): Promise<any | null> {
//         const userAuth = await this.authenticateUser(loginOrEmail, password)
//         return null
//     },
//     async authenticateUser(loginOrEmail: any, password: any): Promise<string | null> {
//         const userAuth = await UsersDbRepository.findByLoginOrEmail(loginOrEmail)
//         return null;
//     }
// }