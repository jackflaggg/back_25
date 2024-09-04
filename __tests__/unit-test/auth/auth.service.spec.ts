import { UsersDbRepository } from '../../../src/repositories/users/users-db-repository';
import { authService } from '../../../src/domain/auth/auth-service';
import { ResultStatus, ResultSuccess } from '../../../src/models/common/errors/errors-type';
import { hashService } from '../../../src/utils/application/hash-service';
import {OutUserFindLoginOrEmail} from "../../../src/models/user/ouput/output-type-users";
import {ObjectId} from "mongodb";
import {createString} from "../../helpers-e2e/datatests";

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

    // Остальные describe блоки
});
