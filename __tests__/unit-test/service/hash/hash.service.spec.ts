import bcrypt from 'bcrypt';
import {hashService} from "../../../src/utils/application/hash-service";
import {createString} from "../../helpers-e2e/datatests";

jest.mock('bcrypt');

describe('hashService', () => {
    const password = createString(10);
    const hashedPassword = createString(10);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('_generateHash', () => {
        it('должен генерировать хэш пароля', async () => {
            const saltRounds = 10;
            (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

            const hash = await hashService._generateHash(password, saltRounds);

            expect(bcrypt.genSalt).toHaveBeenCalledWith(saltRounds);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
            expect(hash).toEqual(hashedPassword);
        });
    });

    describe('comparePassword', () => {
        it('должен правильно сравнивать пароль и хэш', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await hashService.comparePassword(password, hashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(result).toBe(true);
        });

        it('должен возвращать false для неправильного пароля', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await hashService.comparePassword(password, hashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(result).toBe(false);
        });
    });
});
