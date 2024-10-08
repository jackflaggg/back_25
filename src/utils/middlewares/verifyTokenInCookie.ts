import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {blackListTokenCollection} from "../../db/db";
import {jwtService} from "../application/jwt-service";

export const verifyTokenInCookie = async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken){
        console.log(`[refreshToken] неверные куки`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    try {
        const verifyToken = await jwtService.verifyRefreshToken(refreshToken);

        console.log(`проверяем че пришло в верифай токен: ${JSON.stringify(verifyToken)}`);

        if (verifyToken && verifyToken.expired){
            console.log(`[verifyToken] походу истек`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        // TODO: должен ли проверять ее срок? нужно ли проверять в блэк листе?
        const tokenExists = await blackListTokenCollection.findOne({ token: refreshToken });

        if (tokenExists) {
            console.log(`[tokenExists] не прошел авторизацию`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        next();

    } catch (error) {
        console.error(`Error verifying token: `, error);
        res.status(HTTP_STATUSES.NOT_AUTHORIZATION_401).send({errorsMessages: [{field: `middleware refresh`, message: `Refresh token`}]});
        return;
    }
}