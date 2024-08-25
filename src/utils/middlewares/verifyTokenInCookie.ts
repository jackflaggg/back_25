import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {blackListTokenCollection} from "../../db/db";
import {jwtService} from "../application/jwt-service";

export const verifyTokenInCookie = async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    console.log(refreshToken);
    try {
        const verifyToken = await jwtService.verifyRefreshToken(refreshToken);
        console.log(verifyToken)
        if (!verifyToken) {
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        const tokenExists = await blackListTokenCollection.findOne({ token: refreshToken });

        if (tokenExists) {
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        next();

    } catch (error) {
        console.error('Error verifying token: ', error);
        res.status(HTTP_STATUSES.NOT_AUTHORIZATION_401).send({errorsMessages: [{field: 'middleware refresh', message: 'Refresh token'}]});
        return;
    }
}