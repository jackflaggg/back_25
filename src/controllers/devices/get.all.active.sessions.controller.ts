import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";
import {securityDevicesQueryRepository} from "../../repositories/security-devices/security.devices.query.repository";

export const getAllDevicesController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const {userId} = await jwtService.getUserIdByRefreshToken(refreshToken);

    if (!userId){
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return
    }

    const activeSessions = await securityDevicesQueryRepository.getSessionToUserId(userId);

    res
        .status(HTTP_STATUSES.OK_200)
        .send(activeSessions);
    return;
}