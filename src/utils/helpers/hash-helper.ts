import bcrypt from 'bcrypt'

export const hashHelper = {
    async _generateHash(password: string, salt: string) {
        return  await bcrypt.hash(password, salt)
    },
    async createPasswordHash(password: string) {
        const passwordSalt = await bcrypt.hash(password, 10);
        const passwordHash = await this._generateHash(password, passwordSalt);
        return passwordHash;
    },
    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}