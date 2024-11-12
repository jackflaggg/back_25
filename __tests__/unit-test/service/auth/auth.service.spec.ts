import {ObjectId} from "mongodb";
import {OutUserFindLoginOrEmail} from "../../../../src/models/user/ouput/output.type.users";
import {createString} from "../../../helpers-e2e/datatests";
import {randomUUID} from "node:crypto";
import {UsersDbRepository} from "../../../../src/repositories/users/users.db.repository";
import {authService} from "../../../../src/domain/auth/auth.service";
import {ResultStatus, ResultSuccess} from "../../../../src/models/common/errors/errors.type";
import {hashService} from "../../../../src/utils/application/hash.service";
import {jwtService} from "../../../../src/utils/application/jwt.service";
import {loginSuccess} from "../../../../src/models/auth/ouput/auth.service.models";


let outUser : OutUserFindLoginOrEmail ={
    _id: new ObjectId(),
    login: createString(10),
    email: 'success@example.com',
    password: createString(12),
    createdAt: new Date().toISOString()
}

let outUser2 : OutUserFindLoginOrEmail ={
    login: createString(10),
    email: 'success2@example.com',
    password: createString(12),
    createdAt: new Date().toISOString()
}

let UserDbType = {
    id: new ObjectId().toString(),
    login: createString(10),
    password: createString(10),
    email: createString(10),
    createdAt: createString(10),
    emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: new Date(),
        isConfirmed: false
    }
}

let dataAuthService: loginSuccess = {
    status: 'Success',
    data: createString(10)
}

jest.mock('../../../../src/repositories/users/users.db.repository', () => ({
    UsersDbRepository: {
        findUserByLoginOrEmail: jest.fn(),
        createUser: jest.fn(),
        findByEmailUser: jest.fn(),
        findByLoginUser: jest.fn(),
    },
}));

jest.mock('../../../../src/utils/application/hash.service', () => ({
    hashService: {
        comparePassword: jest.fn(),
        _generateHash: jest.fn(),
    }
}));

jest.mock('../../../../src/utils/application/jwt.service', () => ({
    jwtService: {
        createAnyToken: jest.fn(),
    }
}));

jest.mock('../../../../src/managers/email.managers', () => ({
    emailManagers: {
        sendEmailRecoveryMessage: jest.fn()
    },
}));

jest.mock('../../../../src/utils/adapters/email.adapter', () => ({
    emailAdapter: {
        sendEmail: jest.fn()
    },
}));


describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authenticationUserToLogin', () => {
        it('⛔ возвращает ошибку, если юзер не найден', async () => {
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(null);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'invalid', password: 'password' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'user', message: 'Пользователь не найден!' },
                data: null
            });
        });

        it('⛔ возвращает ошибку, если п-ль не прошел проверку', async () => {

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(outUser);

            (hashService.comparePassword as jest.Mock).mockResolvedValue(false);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'invalid', password: 'password' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {field: 'hashService', message: 'Пароль не прошел проверку!'},
                data: null
            });
        });

        it('✅ проходит успешно', async () => {

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(outUser);

            (hashService.comparePassword as jest.Mock).mockResolvedValue(true);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'success', password: 'success_password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: String(outUser._id)
            });
        });
    });

    describe('loginUser', () => {
        it('⛔ возвращает ошибку, если аутентификация рухнула', async () => {
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(null);

            (hashService.comparePassword as jest.Mock).mockResolvedValueOnce(false);

            const loginErrorResponse = {
                status: ResultStatus.BadRequest,
                extensions: { field: 'userId', message: 'Аутентификация рухнула!' },
                data: null
            };

            const response = await authService.loginUser({
                loginOrEmail: createString(10), password: createString(11)
            });

            expect(response).toEqual(loginErrorResponse);
        });

        it('⛔ возвращает ошибку, если в access токене null', async () => {

            jest.spyOn(authService, 'authenticationUserToLogin').mockResolvedValueOnce({
                status: ResultSuccess.Success,
                data: createString(10), // или ваше значение
            });

            (jwtService.createAnyToken as jest.Mock).mockResolvedValueOnce(null);

            const response = await authService.loginUser({
                loginOrEmail: createString(10), password: createString(11)
            });

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {field: 'jwt', message: 'Проблема при генерации Access токена!'},
                data: null
            });
        });

        it('⛔ возвращает ошибку, если в refresh токене null', async () => {

            jest.spyOn(authService, 'authenticationUserToLogin').mockResolvedValueOnce({
                status: ResultSuccess.Success,
                data: createString(10), // или ваше значение
            });

            (jwtService.createAnyToken as jest.Mock)
                .mockResolvedValueOnce('accessToken')
                .mockResolvedValueOnce(null)

            const response = await authService.loginUser({
                loginOrEmail: createString(10), password: createString(11)
            });

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {field: 'refresh', message: 'Проблема при генерации Refresh токена!'},
                data: null
            });
        });

        it('✅ проходит успешно', async () => {

            jest.spyOn(authService, 'authenticationUserToLogin').mockResolvedValueOnce({
                status: ResultSuccess.Success,
                data: String(outUser._id),
            });

            (jwtService.createAnyToken as jest.Mock).mockResolvedValueOnce('access').mockResolvedValueOnce('refresh')

            const response = await authService.loginUser({ loginOrEmail: 'success', password: 'success_password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: ['access', 'refresh']
            });
        });
    });
    describe('registrationUser', () => {
        it('⛔ если некорректные введенные данные, то верни ошибку', async () => {
            const inputData = { login: 'correct', password: 'correct', email: ''};

            const response = await authService.registrationUser(inputData);
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {message: `email is required`, field: `email`},
                data: null
            })
        });

        it('⛔ если данные неуникальны, то верни ошибку', async () => {
            const inputData = { login: 'not_unique', password: 'correct', email: 'correct@email.com' };

            (UsersDbRepository.findByEmailUser as jest.Mock).mockResolvedValueOnce(null);
            (UsersDbRepository.findByLoginUser as jest.Mock).mockResolvedValueOnce(UserDbType);

            const response = await authService.registrationUser(inputData);
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                errors: {message: `not unique ${UserDbType.login}`, field: `login`},
                data: null
            })
        });

        it('⛔ если данные неуникальны, то верни ошибку', async () => {
            const inputData = { login: 'correct', password: 'correct', email: 'correct@email.com' };

            (UsersDbRepository.findByEmailUser as jest.Mock).mockResolvedValueOnce(UserDbType);

            (UsersDbRepository.findByLoginUser as jest.Mock).mockResolvedValueOnce(UserDbType);

            (UsersDbRepository.createUser as jest.Mock).mockResolvedValueOnce(null);

            const response = await authService.registrationUser(inputData);

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                errors: {message: `not unique ${UserDbType.login}`, field: `email`},
                data: null
            })
        });
    })
});
