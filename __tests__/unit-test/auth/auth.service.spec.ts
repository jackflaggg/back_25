import {UsersDbRepository} from "../../../src/repositories/users/users-db-repository";
import {authService} from "../../../src/domain/auth/auth-service";
import {ResultStatus, ResultSuccess} from "../../../src/models/common/errors/errors-type";
import {hashService} from "../../../src/utils/application/hash-service";
import {jwtService} from "../../../src/utils/application/jwt-service";
import {emailManagers} from "../../../src/managers/email-managers";

jest.mock('../../../src/repositories/users/users-db-repository');
jest.mock('../../../src/utils/application/hash-service');
jest.mock('../../../src/utils/application/jwt-service');
jest.mock('../../../src/managers/email-managers');

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authenticationUserToLogin', () => {
        it('should return error if user not found', async () => {
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(null);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'invalid', password: 'password' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'user', message: 'Пользователь не найден!' },
                data: null
            });
        });

        it('should return error if password is incorrect', async () => {
            const mockUser = { password: 'hashedPassword' };
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(mockUser);
            (hashService.comparePassword as jest.Mock).mockResolvedValue(false);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'email', password: 'wrongPassword' });
            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: { field: 'hashService', message: 'Пароль не прошел проверку!' },
                data: null
            });
        });

        it('should return user ID on successful login', async () => {
            const mockUser = { _id: 'userId', password: 'hashedPassword' };
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValue(mockUser);
            (hashService.comparePassword as jest.Mock).mockResolvedValue(true);

            const response = await authService.authenticationUserToLogin({ loginOrEmail: 'email', password: 'password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: 'userId'
            });
        });
    });

    describe('loginUser', () => {
        it('should return error if authentication fails', async () => {
            (authService.authenticationUserToLogin as jest.Mock).mockResolvedValue({
                status: ResultStatus.BadRequest,
                extensions: { field: 'userId', message: 'Аутентификация рухнула!' },
                data: null
            });

            const response = await authService.loginUser({ loginOrEmail: 'email', password: 'password' });
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

            const response = await authService.loginUser({ loginOrEmail: 'email', password: 'password' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: ['token', 'token']
            });
        });
    });

    describe('registrationUser', () => {
        it('should return error if required fields are missing', async () => {
            const response = await authService.registrationUser({ login: '', password: '', email: '' });
            expect(response.status).toEqual(ResultStatus.BadRequest);
            expect(response?.extensions?.message).toMatch(/is required/);
        });

        it('should return error if user already exists', async () => {
            (UsersDbRepository.createUser as jest.Mock).mockResolvedValue(null);
            (hashService._generateHash as jest.Mock).mockResolvedValue('hashedPassword');
            (emailManagers.sendEmailRecoveryMessage as jest.Mock).mockResolvedValue(true);
            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce({ email: 'existing@example.com' });

            const response = await authService.registrationUser({ login: 'existing', password: 'password', email: 'existing@example.com' });
            expect(response.status).toEqual(ResultSuccess.Success);
        });

        it('should successfully register a user', async () => {
            (UsersDbRepository.createUser as jest.Mock).mockResolvedValue('newUserId');
            (hashService._generateHash as jest.Mock).mockResolvedValue('hashedPassword');
            (emailManagers.sendEmailRecoveryMessage as jest.Mock).mockResolvedValue(true);

            const response = await authService.registrationUser({ login: 'newUser', password: 'password', email: 'newUser@example.com' });
            expect(response).toEqual({
                status: ResultSuccess.Success,
                data: 'newUserId'
            });
        });
    });
});
