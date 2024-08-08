import {SETTINGS} from "../../settings";
import jwt from "jsonwebtoken";

export const jwtService = {
    async createToken(userId: string | null): Promise<any> {
        try {
            return jwt.sign(
                {userId: userId},
                SETTINGS.SECRET_KEY,
                {expiresIn: SETTINGS.TOKEN_DURATION}
            )
        }catch (error) {
            console.error('error create Token');
            return null;
        }
    },

    async decodeToken(token: string): Promise<any>  {
        try {
            return jwt.decode(token)
        } catch (error) {
            console.error('Can`t decode token')
            return null
        }
    },

    async verifyToken(token: string): Promise<any>  {
        try {
            return jwt.verify(token, SETTINGS.SECRET_KEY)
        } catch (error) {
            console.error('Token verify some error')
            return null
        }
    }
}