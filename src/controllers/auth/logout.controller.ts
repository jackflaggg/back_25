import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";
import {jwtService} from "../../utils/application/jwt.service";
import {devicesService} from "../../domain/security/security.service";

export const logoutController = async (req: Request, res: Response) => {

    const { refreshToken } = req.cookies;

    const revokeRefreshToken = await jwtService.revokeRefreshToken(refreshToken);

    if (revokeRefreshToken instanceof ErrorAuth || revokeRefreshToken.data === null) {
        console.log(`[authService] не получилось отозвать!`)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    const deleteSession = await devicesService.deleteSessionByRefreshToken(refreshToken);
    if (!deleteSession) {
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}