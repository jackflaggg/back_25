import {errorsBodyToAuthService} from "../../../../src/utils/features/errors.body.to.auth.service";

describe('errorsBodyToAuthService', () => {
    it('должен вернуть null, когда все поля заполнены', () => {
        const result = errorsBodyToAuthService({ login: 'user', password: 'pass', email: 'user@example.com' });
        expect(result).toBe(null);
    });

    it('должен вернуть "login", когда логин пустой', () => {
        const result = errorsBodyToAuthService({ login: '', password: 'pass', email: 'user@example.com' });
        expect(result).toBe('login');
    });

    it('должен вернуть "password", когда пароль пустой', () => {
        const result = errorsBodyToAuthService({ login: 'user', password: '', email: 'user@example.com' });
        expect(result).toBe('password');
    });

    it('должен вернуть "email", когда электронная почта пустая', () => {
        const result = errorsBodyToAuthService({ login: 'user', password: 'pass', email: '' });
        expect(result).toBe('email');
    });
});

