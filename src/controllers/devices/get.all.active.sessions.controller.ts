import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";
import {securityDevicesQueryRepository} from "../../repositories/security-devices/security.devices.query.repository";

export const getAllDevicesController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const ult = await jwtService.getUserIdByRefreshToken(refreshToken);

    if (!ult){
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return
    }

    const activeSessions = await securityDevicesQueryRepository.getSessionToUserId(ult);

    res
        .status(HTTP_STATUSES.OK_200)
        .send(activeSessions);
    return;
}