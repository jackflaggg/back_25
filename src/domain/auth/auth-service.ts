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

export const authService = {
    async authenticationUserToLogin(inputDataUser: InLoginModels): Promise<any> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);

        //TODO: Вернись сюда и сделай проверку isConfirmed!
        if (!credentialLoginOrEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'user', message: 'Пользователь не найден!'},
                data: null
            }
        }

        const checkPassword = await hashService.comparePassword(password, credentialLoginOrEmail.password as string);

        if (!checkPassword) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'hashService', message: 'Пароль не прошел проверку!'},
                data: null
            }
        }
        return {
            status: ResultSuccess.Success,
            data: credentialLoginOrEmail._id
        };
    },

    async loginUser(inputDataUser: InLoginModels) {
        const userId = await this.authenticationUserToLogin(inputDataUser);

        if (userId.status !== ResultSuccess.Success || userId.extensions) {
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

        console.log([generateAccessToken, generateRefreshToken])
        return {
            status: ResultSuccess.Success,
            data: [generateAccessToken, generateRefreshToken]
        }
    },

    async registrationUser(inputData: InRegistrationModels) {

        const { login, password, email } = inputData;

        const requiredFields = new Object([login, password, email]);

        // проверяю на тело
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: `${key} is required`, field: `${key}`},
                    data: null
                }
            }
        }

        // проверка уникальности
        const errors = await errorsUnique( email, login );

        if (errors){
            return {
                status: ResultStatus.BadRequest,
                errors: helperError(errors),
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
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            }
        }

        const createUser = await UsersDbRepository.createUser(newUser);

        try {
            const existingSendEmail = await emailManagers.sendEmailRecoveryMessage(newUser.email, newUser.emailConfirmation.confirmationCode);

            if (!existingSendEmail) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: `${existingSendEmail} is error`, field: `${existingSendEmail}`},
                    data: null
                }
            }
        } catch( e: unknown) {
            console.error('Send email error', e);
            const deleteUser = await UsersDbRepository.deleteUser(createUser as string);

            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `Delete user`, field: 'user'},
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
                extensions: {message: 'code 1', field: 'code'},
                data: null
            }
        }

        if (user.emailConfirmation.confirmationCode !== code) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'confirmationCode', field: 'confirmationCode'},
                data: null
            }
        }

        if (user.emailConfirmation.expirationDate < new Date()) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'expirationDate', field: 'expirationDate'},
                data: null
            }
        }

        if (user.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'isConfirmed is true!', field: 'code'},
                data: null
            }
        }

        const updateUser = await UsersDbRepository.updateEmailConfirmation(userMapperToOutput(user).id);

        if (!updateUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'error code 2', field: 'code'},
                data: updateUser
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
                extensions: {message: `${searchEmail} error find`, field: 'email'},
                data: searchEmail
            }
        }

        if (searchEmail.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'The account has already been confirmed', field: 'email'},
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
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: 'error on sendEmail', field: 'email'},
                    data: null
                }
            }
        } catch (e: unknown){
            console.error(e);
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'emailManagers', field: 'email grock!!!!'},
                data: null
            }
        }

        return {
            status: ResultSuccess.Success,
            data: updateInfoUser
        }
    }
}

