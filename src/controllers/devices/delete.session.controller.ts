import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {jwtService} from "../../utils/application/jwt.service";
import {devicesService} from "../../domain/security/security.service";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";
import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";

export const deleteSessionController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const deviceId = req.params.id;


    const existingDevice = await SecurityDevicesDbRepository.getSessionByDeviceId(deviceId);

    if (!existingDevice){
        console.log('[deviceId] не найден');
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const existingUser = await jwtService.getUserIdByRefreshToken(refreshToken);

    if (existingUser.userId !== existingUser.userId){
        console.log('[userId] не найден');
        res
            .sendStatus(HTTP_STATUSES.NOT_FORBIDDEN_403);
        return;
    }

    const deleteSessionOrDevice = await devicesService.deleteSessionToId(existingDevice.deviceId);

    if (deleteSessionOrDevice instanceof ErrorAuth || deleteSessionOrDevice.data === null){
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res
        .sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}