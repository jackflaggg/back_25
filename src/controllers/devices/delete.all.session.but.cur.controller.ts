import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";
import {devicesService} from "../../domain/security/security.service";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";

export const deleteAllSessionsController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const userDate = await jwtService.getUserIdByRefreshToken(refreshToken);
    if (!userDate){
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    const device = await jwtService.getDeviceIdByRefreshToken(refreshToken);

    // if (!device){
    //     res
    //         .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    //     return;
    // }

    await devicesService.deleteAllSessions(userDate, refreshToken);

    res
        .sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}