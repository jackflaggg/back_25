import bcrypt from 'bcrypt'

export const hashService = {
    async _generateHash(password: string, saltRounds: number = 10) {
        // генерируем соль
        const salt = await bcrypt.genSalt(saltRounds);
        // генерируем хэш на основе пароля и созданной соли
        return  await bcrypt.hash(password, salt)
    },
    async createPasswordHash(password: string) {
        // генерируем хэш пароля
        // в коде используем данный метод для сокрытия логики первого!
        return await this._generateHash(password);
    },
    async comparePassword(password: string, hash: string) {
        // сравниваем пароль с хэшом
        return await bcrypt.compare(password, hash);
    }
}