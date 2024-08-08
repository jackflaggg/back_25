import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";

export const authService = {
    async authenticationUser(inputDataUser: any): Promise<null | any> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);
        if (!credentialLoginOrEmail) {
            return null;
        }

        const checkPassword = await hashService.comparePassword(password, credentialLoginOrEmail.password);
        if (!checkPassword) {
            return null;
        }
    },
    async loginUser(inputDataUser: any) {
        const userLogin = await this.authenticationUser(inputDataUser);
    }
}

