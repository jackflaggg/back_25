import {UsersDbRepository} from "../../../src/repositories/users/users-db-repository";
import {authService} from "../../../src/domain/auth/auth-service";
import {ResultStatus, ResultSuccess} from "../../../src/models/common/errors/errors-type";
import {hashService} from "../../../src/utils/application/hash-service";
import {jwtService} from "../../../src/utils/application/jwt-service";

jest.mock('../../../src/repositories/users/users-db-repository');
jest.mock('../../../src/utils/application/hash-service');
jest.mock('../../../src/utils/application/jwt-service');
jest.mock('../../../src/managers/email-managers');

describe('authService', () => {

    describe('authenticationUserToLogin', () => {
        it('should return error if user not found', async () => {
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(null);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'test', password: 'password' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'user', message: 'Пользователь не найден!' },
                data: null
            });
        });

        it('should return error if password is incorrect', async () => {
            const mockUser = { password: 'hashedpassword' };
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(mockUser);
            (hashService.comparePassword as jest.Mock).mockResolvedValue(false);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'test', password: 'wrongpassword' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'hashService', message: 'Пароль не прошел проверку!' },
                data: null
            });
        });

        it('should return user id on successful login', async () => {
            const mockUser = { _id: 'userId', password: 'hashedpassword' };
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(mockUser);
            (hashService.comparePassword as jest.Mock).mockResolvedValue(true);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'test', password: 'password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: 'userId'
            });
        });
    });

    describe('loginUser', () => {
        it('should return error if authentication fails', async () => {
            const response = await authService.loginUser({ loginOrEmail: 'test', password: 'password' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'userId', message: 'Аутентификация рухнула!' },
                data: null
            });
        });

        it('should return tokens on successful login', async () => {
            (authService.authenticationUserToLogin as jest.Mock).mockResolvedValue({
                status: ResultSuccess.Success,
                data: 'userId'
            });
            (jwtService.createAnyToken as jest.Mock).mockResolvedValue('token');

            const response = await authService.loginUser({ loginOrEmail: 'test', password: 'password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: ['token', 'token'] // В зависимости от реализации добавьте правильные токены
            });
        });
    });

    describe('registrationUser', () => {
        it('should return error if required fields are missing', async () => {
            const response = await authService.registrationUser({ login: '', password: '', email: '' });
            expect(response.status).toEqual(ResultStatus.BadRequest);
            //expect(response.extensions).toMatch('{message: `${key} is required`, field: `${}`');
        });

        // Добавьте дополнительные тесты для проверки уникальности, успешного создания пользователя и т.д.
    });

    describe('confirmationEmailByCode', () => {
        it('should return error if required bad code', async () => {
            const response = await authService.confirmationEmailByCode('bad code');
            expect(response.status).toEqual(ResultStatus.BadRequest);
            //expect(response.extensions).toMatch('{message: \'code 1\', field: \'code\'}');
            expect(response.data).toBe(null)
        });

        // Добавьте дополнительные тесты для проверки уникальности, успешного создания пользователя и т.д.
    });
});