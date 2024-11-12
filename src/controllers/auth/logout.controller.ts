import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {refreshTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt-service";

export const logoutController = async (req: Request, res: Response) => {

    const { refreshToken } = req.cookies;
    const token = await jwtService.verifyRefreshToken(refreshToken);

    if (!token){
        console.log(`[token] не прошел верификацию`)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    const userId = JSON.stringify(token.token?.userId)
    if (!userId){
        console.log(`[userId] не существует`)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    await refreshTokenCollection.insertOne({userId, refreshToken});
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}