import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";
import {InLoginModels, InRegistrationModels} from "../../models/auth/input/login-post-controller";
import {ResultStatus} from "../../models/common/common-types";
import {ObjectId} from "mongodb";
import {randomUUID} from "node:crypto";

export const authService = {
    async authenticationUserToLogin(inputDataUser: any): Promise<null | any> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);

        if (!credentialLoginOrEmail) {
            console.log('Пользователь не найден!')
            return null;
        }

        const checkPassword = await hashService.comparePassword(password, credentialLoginOrEmail.password as string);
        if (!checkPassword) {
            console.log('Пароль не прошел проверку!')
            return null;
        }
        return credentialLoginOrEmail._id;
    },

    async loginUser(inputDataUser: InLoginModels) {
        const userId = await this.authenticationUserToLogin(inputDataUser);

        if (!userId) {
            console.log('Аутентификация рухнула!');
            return null;
        }

        const generateToken = await jwtService.createToken(userId);
        if (!generateToken) {
            console.log('Проблема при генерации токена!')
            return null;
        }

        return generateToken;
    },

    async registrationUser(inputData: InRegistrationModels) {
        const { login, password, email } = inputData;
        const requiredFields = new Object([login, password, email]);
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: { field: key, message: `${key} is required` },
                    data: null
                }
            }
        }
        // дублирование кода
        const existingUserLogin = await UsersDbRepository.findUserByLoginOrEmail(login);
        if (existingUserLogin) {
            return {
                status: ResultStatus.BadRequest,
                extensions: { field: existingUserLogin.login, message: `${existingUserLogin} is not unique` },
                data: null
            }
        }

        const existingUserEmail = await UsersDbRepository.findUserByLoginOrEmail(email);
        if (existingUserEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: { field: existingUserEmail.email, message: `${existingUserEmail} is not unique` },
                data: null
            }
        }

        const passUser = await hashService._generateHash(password);
        const createdUser = {
            ...inputData,
            password: passUser,
            _id: new ObjectId(),
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: new Date(Date.parse(new Date().toISOString()) + 36_00_000).toISOString(),
                isConfirmed: false
            }
        }

    },
    async confirmationRegistrationUser(inputData: any) {},
    async registrationEmailResending(inputData: any) {}
}

