import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";
import {InLoginModels, InRegistrationModels} from "../../models/auth/input/login-post-controller";
import {randomUUID} from "node:crypto";
import {emailManagers} from "../../managers/email-managers";
import {errorsUnique} from "../../utils/features/errors-validate";
import { add } from "date-fns/add";
import {helperError} from "../../utils/helpers/helper-error";
import {userMapperToOutput} from "../../utils/mappers/user-mapper";
import {SETTINGS} from "../../settings";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors-type";
import {loginError, LoginErrorTwo, loginSuccess} from "../../models/auth/ouput/auth-service-models";
import {errorsBodyToAuthService} from "../../utils/features/errors-body-to-authservice";
import {emailConfirmation} from "../../utils/features/emailConfirmation";

export const authService = {
    async authenticationUserToLogin(inputDataUser: InLoginModels): Promise<loginError | loginSuccess> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);

        if (!credentialLoginOrEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'user', message: 'Пользователь не найден!'},
                data: null
            }
        }
        console.log(password, credentialLoginOrEmail.password);
        const checkPassword = await hashService.comparePassword(password, String(credentialLoginOrEmail.password));

        if (!checkPassword) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'hashService', message: 'Пароль не прошел проверку!'},
                data: null
            }
        }

        return {
            status: ResultSuccess.Success,
            data: String(credentialLoginOrEmail._id)
        };
    },

    async loginUser(inputDataUser: InLoginModels) {
        const userId = await this.authenticationUserToLogin(inputDataUser);

        if (userId instanceof LoginErrorTwo || userId.data === null ) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'userId', message: 'Аутентификация рухнула!'},
                data: null
            }
        }

        const generateAccessToken = await jwtService.createAnyToken(userId.data, SETTINGS.EXPIRES_IN_ACCESS_TOKEN);

        if (!generateAccessToken) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'jwt', message: 'Проблема при генерации Access токена!'},
                data: null
            }
        }

        const generateRefreshToken = await jwtService.createAnyToken(userId.data, SETTINGS.EXPIRES_IN_REFRESH_TOKEN);

        if (!generateRefreshToken) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'refresh', message: 'Проблема при генерации Refresh токена!'},
                data: null
            }
        }

        console.log(['это jwt: ' + generateAccessToken, 'это refresh: ' + generateRefreshToken])
        return {
            status: ResultSuccess.Success,
            data: {
                jwt: generateAccessToken,
                refresh: generateRefreshToken}
        }
    },

    async registrationUser(inputData: InRegistrationModels) {

        const { login, password, email } = inputData;

        const requiredFields = { login, password, email };


        const errField = errorsBodyToAuthService(requiredFields);
        if (errField !== null){
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `${errField} is required`, field: `${errField}`},
                data: null
            }
        }

        const uniqueErrors = await errorsUnique( email, login );

        if (uniqueErrors){
            return {
                status: ResultStatus.BadRequest,
                errors: helperError(uniqueErrors),
                data: null
            }
        }

        const passUser = await hashService._generateHash(password);

        const newUser = {
            login,
            email,
            password: passUser,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {hours: 1, minutes: 30}),
                isConfirmed: false
            }
        }

        const createUser = await UsersDbRepository.createUser(newUser);

        try {
            const {email, emailConfirmation: { confirmationCode } } = newUser;

            const existingSendEmail = await emailManagers.sendEmailRecoveryMessage(email, confirmationCode);

            if (!existingSendEmail) {
                const deleteUser = await UsersDbRepository.deleteUser(String(createUser));

                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: `${existingSendEmail} это ошибка`, field: `email`},
                    data: null
                }
            }
        } catch( e: unknown) {
            console.error('Отправка сообщения произошла с ошибкой', e);

            const deleteUser = await UsersDbRepository.deleteUser(String(createUser));

            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `Удаление юзера`, field: 'user'},
                data: deleteUser
            }
        }
        return {
            status: ResultSuccess.Success,
            data: createUser
        }
    },
    async confirmationEmailByCode(code: string) {
        const user = await UsersDbRepository.findCodeUser(code);

        if (!user) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'не найден юзер', field: 'code'},
                data: null
            }
        }

        if (user.emailConfirmation.confirmationCode !== code) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'отсутствует код', field: 'confirmationCode'},
                data: null
            }
        }

        if (user.emailConfirmation.expirationDate && user.emailConfirmation.expirationDate < new Date()) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'прошло время, обновись', field: 'expirationDate'},
                data: null
            }
        }

        if (user.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'подтверждение уже было', field: 'code'},
                data: null
            }
        }

        const updateUser = await UsersDbRepository.updateEmailConfirmation(userMapperToOutput(user).id);

        if (!updateUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'произошла ошибка при обновлении кода', field: 'code'},
                data: null
            }
        }

        return {
            status: ResultSuccess.Success,
            data: updateUser
        }
    },
    async registrationEmailResending(email: string) {
        const searchEmail = await UsersDbRepository.findByEmailUser(email);
        if (!searchEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `${searchEmail} не был найден `, field: 'email'},
                data: searchEmail
            }
        }

        if (searchEmail.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'аккаунт уже был активирован, в повторной ссылке нет нужды', field: 'email'},
                data: searchEmail
            }
        }

        const newCode = randomUUID();
        const newExpirationDate = add(new Date(), {
            hours: 1,
            minutes: 30
        })

        const updateInfoUser = await UsersDbRepository.updateCodeAndDateConfirmation(userMapperToOutput(searchEmail).id, newCode, newExpirationDate);
        try {
            const sendEmail = await emailManagers.sendEmailRecoveryMessage(email, newCode);
            if (!sendEmail) {
                const deleteUser = await UsersDbRepository.deleteUser(String(searchEmail.id))
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: '[authService] ошибка при повторной отправке письма', field: 'email'},
                    data: null
                }
            }
        } catch (e: unknown){
            console.log(JSON.stringify(e));
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: '[emailManagers]', field: 'email Resending'},
                data: null
            }
        }

        return {
            status: ResultSuccess.Success,
            data: updateInfoUser
        }
    }
}

