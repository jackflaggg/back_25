import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {refreshTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt-service";

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
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    // отзываем старый рефрештокен
    await refreshTokenCollection.insertOne({ refreshToken});

    const newAccessToken = await jwtService.createAnyToken(userId, '10s');
    const newRefreshToken = await jwtService.createAnyToken(userId, '20s');

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}