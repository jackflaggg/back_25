import { UsersDbRepository } from '../../../src/repositories/users/users-db-repository';
import { authService } from '../../../src/domain/auth/auth-service';
import { ResultStatus, ResultSuccess } from '../../../src/models/common/errors/errors-type';
import { hashService } from '../../../src/utils/application/hash-service';
import {ObjectId} from "mongodb";
import {createString} from "../../helpers-e2e/datatests";
import {jwtService} from "../../../src/utils/application/jwt-service";
import {postsRepository} from "../../../src/repositories/posts/posts-db-repository";
import {postsService} from "../../../src/domain/post/post-service";

jest.mock('../../../src/repositories/posts/posts-db-repository', () => ({
    postsRepository: {
        createPost: jest.fn(),
        putPost: jest.fn(),
        delPost: jest.fn(),
    },
}));


describe('postsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('⛔ возвращает ошибку, если Некорректный объект, Серверная ошибка, Ошибка при вставке', async () => {
            (postsRepository.createPost as jest.Mock).mockResolvedValue(null);

            const response = await postsService.createPost(
                { title: 'new title', shortDescription: 'описание', content: 'новый контент', blogId: new ObjectId().toString(), blogName:},
                { id: new ObjectId().toString(), name: 'blog'})

            expect(response).toBeNull()
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

    describe('putPost', () => {
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

            (UsersDbRepository.findUserByLoginOrEmail as jest.Mock).mockResolvedValueOnce(outUser2);

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
    describe('delPost', () => {
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

            // (emailManagers.sendEmailRecoveryMessage as jest.Mock).mockResolvedValueOnce()
            //
            // (emailAdapter.sendEmail as jest.Mock).mockResolvedValueOnce();

            const response = await authService.registrationUser(inputData);

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                errors: {message: `not unique ${UserDbType.login}`, field: `email`},
                data: null
            })
        });
    });

    describe('createCommentToPost', () => {
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

            // (emailManagers.sendEmailRecoveryMessage as jest.Mock).mockResolvedValueOnce()
            //
            // (emailAdapter.sendEmail as jest.Mock).mockResolvedValueOnce();

            const response = await authService.registrationUser(inputData);

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                errors: {message: `not unique ${UserDbType.login}`, field: `email`},
                data: null
            })
        });
    })
});
