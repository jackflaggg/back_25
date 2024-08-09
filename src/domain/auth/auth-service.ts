import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";

export const authService = {
    async authenticationUser(inputDataUser: any): Promise<null | any> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);
        if (!credentialLoginOrEmail) {
            console.log('Пользователь не найден!')
            return null;
        }

        const checkPassword = await hashService.comparePassword(password, credentialLoginOrEmail.password);
        if (!checkPassword) {
            console.log('Пароль не прошел проверку!')
            return null;
        }
        return credentialLoginOrEmail._id;
    },
    async loginUser(inputDataUser: any) {
        const userId = await this.authenticationUser(inputDataUser);

        if (!userId) {
            console.log('Аутентификация рухнула!')
            return null;
        }

        const generateToken = await jwtService.createToken(userId);
        if (!generateToken) {
            console.log('Проблема при генерации токена!')
            return null;
        }

        return generateToken;
    }
}

