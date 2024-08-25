import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {refreshService} from "../../utils/application/refresh-service";
import {blackListTokenCollection} from "../../db/db";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const verifiedRefreshToken = await refreshService.verifyRefreshToken(refreshToken);

    if (!verifiedRefreshToken) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    //TODO: Непонятно с датой
    const blackListToken = await blackListTokenCollection.insertOne({ token: refreshToken});

    const newAccessToken = await refreshService.generateAnyToken(String(verifiedRefreshToken), '10s');
    const newRefreshToken = await refreshService.generateAnyToken(String(verifiedRefreshToken), '20s');

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}