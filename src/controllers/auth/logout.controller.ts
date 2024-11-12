import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {refreshTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt.service";
import {authService} from "../../domain/auth/auth.service";
import {LoginErrorTwo} from "../../models/auth/ouput/auth.service.models";

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

    const revokeRefreshToken = await authService.revokeRefreshToken(userId, refreshToken);
    if (revokeRefreshToken instanceof LoginErrorTwo || revokeRefreshToken.data === null) {
        console.log(`[authService] не получилось отозвать!`)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}