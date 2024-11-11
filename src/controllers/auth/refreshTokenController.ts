import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {refreshTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt-service";
import {randomUUID} from "node:crypto";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);

    if (!verifiedRefreshToken || verifiedRefreshToken.expired) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    console.log(verifiedRefreshToken);
    const userId = verifiedRefreshToken.token?.userId;

    if (!userId) {
        console.log('[userId] в токене отсутствует')
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    // отзываем старый рефрештокен
    await refreshTokenCollection.insertOne({userId, refreshToken});
    //TODO: Временно изменяю expires
    const newAccessToken = await jwtService.createAccessToken(userId, '1000s');

    const deviceId = String(randomUUID());

    const newRefreshToken = await jwtService.createRefreshToken(userId, deviceId, '2000s');

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}