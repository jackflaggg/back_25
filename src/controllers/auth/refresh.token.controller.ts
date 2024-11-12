import {HTTP_STATUSES} from "../../models/common/common.types";
import {Request, Response} from "express";
import {jwtService} from "../../utils/application/jwt.service";
import {randomUUID} from "node:crypto";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;

    const device = await jwtService.getDeviceIdByRefreshToken(refreshToken);

    const updateTokens = jwtService
    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}