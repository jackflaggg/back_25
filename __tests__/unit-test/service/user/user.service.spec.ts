import {ResultStatus, ResultSuccess} from "../../../../src/models/common/errors/errors.type";
import {userService} from "../../../../src/domain/user/user.service";
import {errorsUnique} from "../../../../src/utils/features/errors.validate";
import {inCreateUser} from "../helper-unit/user.service.helper";
import {errorsMessages} from "../../../src/utils/features/errorsMessages";
import {createString} from "../../helpers-e2e/datatests";
import {OutCreateUserError, OutCreateUserSuccess} from "../../../src/models/user/ouput/user-service-models";
import {helperError} from "../../../src/utils/helpers/helper-error";
import {UsersDbRepository} from "../../../src/repositories/users/users-db-repository";
import {ObjectId} from "mongodb";

jest.mock('../../../src/repositories/posts/posts-db-repository', () => ({
    postsRepository: {
        createPost: jest.fn(),
        putPost: jest.fn(),
        delPost: jest.fn(),
    },
}));

jest.mock('../../../src/repositories/users/users-db-repository', () => ({
    UsersDbRepository: {
        createUser: jest.fn(),
        deleteUser: jest.fn()
    },
}));

jest.mock('../../../src/utils/features/errors-validate', () => ({
    errorsUnique: jest.fn(),
}));

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('⛔ возвращает ошибку, если входящие данные не уникальны', async () => {
            const user = inCreateUser();

            (errorsUnique as jest.Mock).mockResolvedValue(errorsMessages({message: createString(10), field: createString(10)}));

            const response = await userService.createUser(user);

            expect(response).toEqual(new OutCreateUserError(
                ResultStatus.BadRequest,
                helperError(errorsMessages({message: createString(10), field: createString(10)})),
                null
            ))
        });

        it('⛔ возвращает ошибку, если возникла ошибка при создании юзера', async () => {
            const user = inCreateUser();

            (errorsUnique as jest.Mock).mockResolvedValue(false);

            (UsersDbRepository.createUser as jest.Mock).mockResolvedValue(null);

            const response = await userService.createUser(user);

            expect(response).toEqual(new OutCreateUserError(
                ResultStatus.BadRequest,
                {field: 'user', message: 'error create user'},
                null))
        });

        it('✅ успешное создание юзера', async () => {
            const userId = new ObjectId().toString();

            const user = inCreateUser();

            (errorsUnique as jest.Mock).mockResolvedValue(false);

            (UsersDbRepository.createUser as jest.Mock).mockResolvedValue(userId);

            const response = await userService.createUser(user);

            expect(response).toEqual(new OutCreateUserSuccess(
                ResultSuccess.Success, userId))
        });
    });
    describe('delUser', () => {
        it('⛔ возвращает ошибку, если не получилось удалить', async () => {
            const userId = new ObjectId().toString();
            (UsersDbRepository.deleteUser as jest.Mock).mockResolvedValue(false);

            const response = await userService.delUser(userId);

            expect(response).toBeFalsy()
        });

        it('✅ успешно удаляет', async () => {
            const userId = new ObjectId().toString();
            (UsersDbRepository.deleteUser as jest.Mock).mockResolvedValue(true);

            const response = await userService.delUser(userId);

            expect(response).toBeTruthy()
        });
    })
});
