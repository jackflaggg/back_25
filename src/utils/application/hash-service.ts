import bcrypt from 'bcrypt'

export const hashService = {
    async _generateHash(password: string, saltRounds: number = 10): Promise<string> {
        const salt = await bcrypt.genSalt(saltRounds);
        return  await bcrypt.hash(password, salt)
    },
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}