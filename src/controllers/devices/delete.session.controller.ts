import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";

export const deleteSessionController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const { deviceId} = req.params;

    if (!deviceId){
        console.log('[deviceId] не передан');
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    const dateUser = await jwtService.getUserIdByRefreshToken(refreshToken);

    if (!dateUser || !dateUser.userId){
        console.log('[userId] не найден');
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    console.log(refreshToken, deviceId)
    res
        .sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}