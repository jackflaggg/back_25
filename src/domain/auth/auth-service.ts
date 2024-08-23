import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";
import {InLoginModels, InRegistrationModels} from "../../models/auth/input/login-post-controller";
import {HTTP_STATUSES, ResultError, ResultStatus, ResultSuccess} from "../../models/common/common-types";
import {randomUUID} from "node:crypto";
import {emailManagers} from "../../managers/email-managers";
import {errorsValidate} from "../../utils/features/errors-validate";
import add from "date-fns/add";

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

        const errors = await errorsValidate( email, login );

        if (errors){
            return {
                status: String(HTTP_STATUSES.BAD_REQUEST_400),
                data: errors
            } as ResultError
        }

        const passUser = await hashService._generateHash(password);

        const newUser = {
            login,
            email,
            password: passUser,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            }
        }

        const createUser = await UsersDbRepository.createUser(newUser);
        try {
            const existingSendEmail = await emailManagers.sendEmailRecoveryMessage(newUser.email, 'Rasul', newUser.emailConfirmation.confirmationCode)
            if (!existingSendEmail) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {field: existingSendEmail, message: `${existingSendEmail} is error`},
                    data: null
                }
            }
        } catch( e: unknown) {
            console.error('Send email error', e);
        }
        return {
            status: ResultSuccess.Success,
            data: null
        }
    },
    async confirmationRegistrationUser(inputData: any) {},
    async registrationEmailResending(inputData: any) {}
}

