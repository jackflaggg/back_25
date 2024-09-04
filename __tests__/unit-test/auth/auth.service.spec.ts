import { UsersDbRepository } from '../../../src/repositories/users/users-db-repository';
import { authService } from '../../../src/domain/auth/auth-service';
import { ResultStatus, ResultSuccess } from '../../../src/models/common/errors/errors-type';
import { hashService } from '../../../src/utils/application/hash-service';
import {OutUserFindLoginOrEmail} from "../../../src/models/user/ouput/output-type-users";
import {ObjectId} from "mongodb";
import {createString} from "../../helpers-e2e/datatests";
import {jwtService} from "../../../src/utils/application/jwt-service";

let outUser : OutUserFindLoginOrEmail ={
    _id: new ObjectId(),
    login: createString(10),
    email: 'success@example.com',
    password: createString(12),
    createdAt: new Date().toISOString()
}

jest.mock('../../../src/repositories/users/users-db-repository', () => ({
    UsersDbRepository: {
        findUserByLoginOrEmail: jest.fn(),
        createUser: jest.fn(),
    },
}));

jest.mock('../../../src/utils/application/hash-service', () => ({
    hashService: {
        comparePassword: jest.fn(),
        _generateHash: jest.fn(),
    }
}));

jest.mock('../../../src/utils/application/jwt-service', () => ({
    jwtService: {
        createAnyToken: jest.fn(),
    }
}));

jest.mock('../../../src/managers/email-managers', () => ({
    emailManagers: {
        sendEmailRecoveryMessage: jest.fn()
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

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(outUser);

            (hashService.comparePassword as jest.Mock).mockResolvedValueOnce(true);

            (jwtService.createAnyToken as jest.Mock).mockResolvedValueOnce(null)

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

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(outUser);

            (hashService.comparePassword as jest.Mock).mockResolvedValueOnce(true);

            (jwtService.createAnyToken as jest.Mock)
                .mockResolvedValueOnce('accessToken')
                .mockResolvedValueOnce(null)

            const response = await authService.loginUser({
                loginOrEmail: createString(10), password: createString(11)
            });

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {field: 'jwt', message: 'Проблема при генерации Refresh токена!'},
                data: null
            });
        });

        it('✅ проходит успешно', async () => {

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(outUser);

            (hashService.comparePassword as jest.Mock).mockResolvedValue(true);

            (jwtService.createAnyToken as jest.Mock)
                .mockResolvedValue('access')
                .mockResolvedValue('refresh')

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'success', password: 'success_password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: [createString(17), createString(16)]
            });
        });
    });
});
