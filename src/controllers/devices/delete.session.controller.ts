import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";

export const deleteSessionController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const {deviceId} = req.params;

    if (!deviceId){
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    const dateUser = await jwtService.getUserIdByRefreshToken(refreshToken);
    if (!dateUser || !dateUser.userId){
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

}