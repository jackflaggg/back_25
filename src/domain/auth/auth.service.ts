import {UsersDbRepository} from "../../repositories/users/users.db.repository";
import {hashService} from "../../utils/application/hash.service";
import {jwtService} from "../../utils/application/jwt.service";
import {InLoginModels, InRegistrationModels} from "../../models/auth/input/login.post.controller";
import {randomUUID} from "node:crypto";
import {emailManagers} from "../../managers/email.managers";
import {errorsUnique} from "../../utils/features/errors.validate";
import {add} from "date-fns/add";
import {helperError} from "../../utils/helpers/helper.error";
import {userMapperToOutput} from "../../utils/mappers/user.mapper";
import {SETTINGS} from "../../settings";
import {ResultStatus, ResultSuccess} from "../../models/common/errors/errors.type";
import {ViewModel, ErrorAuth, loginSuccess} from "../../models/auth/ouput/auth.service.models";
import {errorsBodyToAuthService} from "../../utils/features/errors.body.to.auth.service";
import {devicesService} from "../security/security.service";
import {refreshTokenCollection} from "../../db/db";

export const authService = {
    async authenticationUserToLogin(inputDataUser: InLoginModels): Promise<ViewModel> {

        const {loginOrEmail, password} = inputDataUser;

        const credentialLoginOrEmail = await UsersDbRepository.findUserByLoginOrEmail(loginOrEmail);

        if (!credentialLoginOrEmail) {
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'user', message: 'Пользователь не найден!'})
        }

        const checkPassword = await hashService.comparePassword(password, String(credentialLoginOrEmail.password));

        if (!checkPassword) {
            return new ErrorAuth(ResultStatus.BadRequest, {
                field: 'hashService',
                message: 'Пароль не прошел проверку!'
            });
        }

        return {
            status: ResultSuccess.Success,
            data: String(credentialLoginOrEmail._id)
        };
    },

    async loginUser(inputDataUser: InLoginModels, ipDevices: string, titleDevice: string = 'Chrome'): Promise<ViewModel> {
        const userId = await this.authenticationUserToLogin(inputDataUser);

        if (userId instanceof ErrorAuth || userId.data === null) {
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'userId', message: 'Аутентификация рухнула!'});
        }

        const deviceId = String(randomUUID());

        const generateAccessToken = await jwtService.createAccessToken(userId.data);
        const generateRefreshToken = await jwtService.createRefreshToken(userId.data, deviceId);

        if (!generateAccessToken || !generateRefreshToken) {
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'token', message: 'Проблема при генерации токена!'});
        }

        const existingRefresh = await refreshTokenCollection.insertOne({refreshToken: generateRefreshToken});
        if (!existingRefresh.acknowledged) {
            return new ErrorAuth(ResultStatus.BadRequest, {field: 'token', message: 'Проблема при вставке токена!'});
        }
        const lastActivateRefreshToken = await jwtService.decodeToken(generateRefreshToken!);

        if (!generateRefreshToken || !lastActivateRefreshToken) {
            return new ErrorAuth(ResultStatus.BadRequest, {
                field: 'refresh',
                message: 'Проблема при генерации Refresh токена!'
            });
        }

        const devices = await devicesService.createSessionToDevice(ipDevices, titleDevice, deviceId, userId.data, (new Date(Number(lastActivateRefreshToken.iat) * 1000).toISOString()), generateRefreshToken);

        if (devices instanceof ErrorAuth || devices.data === null) {
            return devices
        }

        return {
            status: ResultSuccess.Success,
            data: {
                jwt: generateAccessToken,
                refresh: generateRefreshToken
            }
        }
    },

    async registrationUser(inputData: InRegistrationModels): Promise<ViewModel> {

        const {login, password, email} = inputData;

        const requiredFields = {login, password, email};


        const errField = errorsBodyToAuthService(requiredFields);

        if (errField !== null) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: `${errField} отсутствует`, field: `${errField}`},
                data: null
            }
        }

        const uniqueErrors = await errorsUnique(email, login);

        if (uniqueErrors) {
            return {
                status: ResultStatus.Forbidden,
                extensions: helperError(uniqueErrors),
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


        const {email: userEmail, emailConfirmation: {confirmationCode}} = newUser;

        emailManagers.sendEmailRecoveryMessage(userEmail, confirmationCode)
            .then(async (existingSendEmail) => {
                if (!existingSendEmail) {
                    await UsersDbRepository.deleteUser(String(createUser));
                }
            })
            .catch(async (e) => {
                await UsersDbRepository.deleteUser(String(createUser));
            })


        return {
            status: ResultSuccess.Success,
            data: createUser
        }
    },

    async confirmationEmailByCode(code: string): Promise<ViewModel> {
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

        if (user.emailConfirmation.expirationDate !== null && !user.emailConfirmation.isConfirmed) {

            const currentDate = new Date(); // Текущая дата
            const expirationDate = new Date(user.emailConfirmation.expirationDate);

            if (expirationDate < currentDate) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: {message: 'прошло время, переобновись', field: 'expirationDate'},
                    data: null
                }
            }
        }
        if (user.emailConfirmation.isConfirmed && user.emailConfirmation.confirmationCode === null) {
            return {
                status: ResultStatus.BadRequest,
                extensions: {message: 'подтверждение уже было', field: 'code'},
                data: null
            }
        }

        const updateUser = await UsersDbRepository.updateEmailConfirmation(userMapperToOutput(user).id, user.emailConfirmation.confirmationCode);

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

    async registrationEmailResending(email: string): Promise<ViewModel> {
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
        emailManagers.sendEmailRecoveryMessage(email, newCode)
            .then(async (sendEmail) => {
            if (!sendEmail) {
                await UsersDbRepository.deleteUser(String(searchEmail.id));
            }
        }).catch(async (e: unknown) => {
        })

        return {
            status: ResultSuccess.Success,
            data: updateInfoUser
        }
    }
}

