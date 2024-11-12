import {errorsUnique} from "../../../../src/utils/features/errors.validate";
import {createString} from "../../../helpers-e2e/datatests";
import {UsersDbRepository} from "../../../../src/repositories/users/users.db.repository";
import {randomUUID} from "node:crypto";
import {ObjectId} from "mongodb";

jest.mock('../../../../src/repositories/users/users.db.repository', () => ({
    UsersDbRepository: {
            findByEmailUser: jest.fn(),
            findByLoginUser: jest.fn(),
    }
}));

const testUserDbType = {
    id: new ObjectId().toString(),
    login: createString(10) + 1,
    password: createString(10) + 1,
    email: createString(10) + 1,
    createdAt: createString(10) + 1,
    emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: new Date(),
        isConfirmed: false
    }
}

describe('errors-unique', () => {
    it('возвращает успех, если все уникально', async () => {
        (UsersDbRepository.findByEmailUser as jest.Mock).mockResolvedValueOnce(null);
        (UsersDbRepository.findByLoginUser as jest.Mock).mockResolvedValueOnce(null);

        const res = await errorsUnique(createString(10), createString(10));
        expect(res).toBeFalsy();
    });

    it('возвращает ошибку, если юзер найден по мэйлу', async () => {
        (UsersDbRepository.findByEmailUser as jest.Mock).mockResolvedValueOnce(testUserDbType);
        (UsersDbRepository.findByLoginUser as jest.Mock).mockResolvedValueOnce(null);
        const res = await errorsUnique(createString(10), createString(10));
        expect(res).toEqual({errorsMessages: [
                {
                    field: "email",
                    message: `not unique ${testUserDbType.email}`
                }
            ]})
    });

    it('возвращает ошибку, если юзер найден по логину', async () => {
        const {id, ...withObjectUser} = testUserDbType;
        (UsersDbRepository.findByEmailUser as jest.Mock).mockResolvedValueOnce(null);
        (UsersDbRepository.findByLoginUser as jest.Mock).mockResolvedValueOnce(withObjectUser);
        const res = await errorsUnique(createString(10), createString(10));
        expect(res).toEqual({errorsMessages: [
                {
                    field: "login",
                    message: `not unique ${testUserDbType.login}`
                }
            ]})
    });
})