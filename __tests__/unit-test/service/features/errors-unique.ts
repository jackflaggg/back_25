import {errorsUnique} from "../../../../src/utils/features/errors-validate";
import {createString} from "../../../helpers-e2e/datatests";
import {UsersDbRepository} from "../../../../src/repositories/users/users-db-repository";
import {emailInfo} from "../../../../src/models/user/ouput/output-type-users";
import {randomUUID, UUID} from "node:crypto";
import {ObjectId} from "mongodb";

jest.mock('../../../../src/repositories/users/users-db-repository', () => ({
    //TODO: Зачем оборачиваем в () объект
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

    // it('should return an error if the user doesn\'t exist', async () => {
    //     const res = await errorsUnique();
    //     expect(res).toEqual()
    // });
    //
    // it('should return an error if the user doesn\'t exist', async () => {
    //     const res = await errorsUnique();
    //     expect(res).toEqual()
    // });
})