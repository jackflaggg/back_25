import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {refreshTokenCollection} from "../../db/db";
import {jwtService} from "../application/jwt.service";

export const verifyTokenInCookie = async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken){
        console.log(`[refreshToken] токен отсутствует в куке`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    try {
        const verifyToken = await jwtService.verifyRefreshToken(refreshToken);

        console.log(`проверяем че пришло в верифай-REFRESH токен: ${JSON.stringify(verifyToken)}`);

        if (!verifyToken || verifyToken.expired){
            console.log(`[verifyToken] походу истек`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const tokenExists = await refreshTokenCollection.findOne({ refreshToken });

        if (tokenExists) {
            console.log(`[tokenExists] такой токен существует`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        next();

    } catch (error) {
        console.log(`Error verifying token: `, JSON.stringify(error));
        res.status(HTTP_STATUSES.NOT_AUTHORIZATION_401).send({errorsMessages: [{field: `middleware refresh`, message: `Refresh token`}]});
        return;
    }
}