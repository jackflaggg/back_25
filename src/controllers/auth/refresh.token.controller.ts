import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {jwtService} from "../../utils/application/jwt-service";
import {randomUUID} from "node:crypto";
import {authService} from "../../domain/auth/auth.service";
import {LoginErrorTwo} from "../../models/auth/ouput/auth.service.models";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);

    if (!verifiedRefreshToken || verifiedRefreshToken.expired) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    const userId = verifiedRefreshToken.token?.userId;

    if (!userId) {
        console.log('[userId] в токене отсутствует')
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    // отзываем старый рефрештокен
    const revokeRefreshToken = await authService.revokeRefreshToken(userId, refreshToken);

    if (revokeRefreshToken instanceof LoginErrorTwo || revokeRefreshToken.data === null) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    //TODO: Временно изменяю expires
    const newAccessToken = await jwtService.createAccessToken(userId, '1000s');

    const deviceId = String(randomUUID());

    const newRefreshToken = await jwtService.createRefreshToken(userId, deviceId, '2000s');

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}