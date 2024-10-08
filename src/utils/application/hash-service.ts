import bcrypt from 'bcrypt'

export const hashService = {
    async _generateHash(password: string, saltRounds: number = 10): Promise<string> {
        // генерируем соль
        const salt = await bcrypt.genSalt(saltRounds);
        // генерируем хэш на основе пароля и созданной соли
        return  await bcrypt.hash(password, salt)
    },
    async comparePassword(password: string, hash: string): Promise<boolean> {
        // сравниваем пароль с хэшом
        return await bcrypt.compare(password, hash);
    }
}