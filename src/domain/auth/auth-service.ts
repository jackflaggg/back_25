import {UsersDbRepository} from "../../repositories/users/users-db-repository";
import {hashService} from "../../utils/application/hash-service";
import {jwtService} from "../../utils/application/jwt-service";
import {InLoginModels, InRegistrationModels} from "../../models/auth/input/login-post-controller";
import {ResultStatus, ResultSuccess} from "../../models/common/common-types";
import {randomUUID} from "node:crypto";
import {emailManagers} from "../../managers/email-managers";
import {errorsUnique} from "../../utils/features/errors-validate";
import { add } from "date-fns/add";
import {helperError} from "../../utils/helpers/helper-error";

export const authService = {
    async authenticationUserToLogin(inputDataUser: any): Promise<null | any> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);

        //TODO: Вернись сюда и сделай проверку isConfirmed!
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
        console.log(requiredFields)
        // проверяю на тело
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: { field: key, message: `${key} is required` },
                    data: null
                }
            }
        }

        // проверка уникальности
        const errors = await errorsUnique( email, login );

        if (errors){
            return {
                status: ResultStatus.BadRequest,
                errors: helperError(errors)
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
                    extensions: {field: existingSendEmail, message: `${existingSendEmail} is error`},
                    data: null
                }
            }
        } catch( e: unknown) {
            console.error('Send email error', e);
            const deleteUser = await UsersDbRepository.deleteUser(createUser as string);

            return {
                status: ResultSuccess.Success,
                extensions: {field: e, message: `Delete user`},
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
                extensions: {errorsMessages: [{message: 'error code 1', field: 'code'}]},
                data: null
            }
        }

        if (user.emailConfirmation.confirmationCode !== code) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }

        if (user.emailConfirmation.expirationDate < new Date()) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }

        if (user.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: { errorsMessages: {field: 'isConfirmed', message: 'isConfirmed is true!'}},
                data: null
            }
        }
        console.log(user._id, user.id)
        const updateUser = await UsersDbRepository.updateEmailConfirmation(user.id as string);

        if (!updateUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {errorsMessages: [{message: 'error code 2', field: 'code'}]},
                data: updateUser
            }
        }

        return {
            status: ResultSuccess,
            data: updateUser
        }
    },
    async registrationEmailResending(email: string) {
        const searchEmail = await UsersDbRepository.findByEmailUser(email);
        if (!searchEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'email', message: `${searchEmail} error find`},
                data: searchEmail
            }
        }

        if (searchEmail.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'isConfirmed', message: 'The account has already been confirmed'},
                data: searchEmail
            }
        }

        const newCode = randomUUID();
        const newExpirationDate = add(new Date(), {
            hours: 1,
            minutes: 30
        })

        const updateInfoUser = await UsersDbRepository.updateCodeAndDateConfirmation(searchEmail.id, newCode, newExpirationDate);
        try {
            const sendEmail = await emailManagers.sendEmailRecoveryMessage(email, newCode);
            if (!sendEmail) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {field: 'sendEmail', message: 'error on sendEmail'},
                    data: null
                }
            }
        } catch (e: unknown){
            console.error(e);
            return {
                status: ResultStatus.BadRequest,
                extensions: {field: 'isConfirmed', message: e},
                data: null
            }
        }

        return {
            status: ResultSuccess.Success,
            data: updateInfoUser
        }
    }
}

