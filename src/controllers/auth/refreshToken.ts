import {HTTP_STATUSES} from "../../models/common/common-types";
import {Request, Response} from "express";
import {blackListTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt-service";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);
    const blackListToken = await blackListTokenCollection.insertOne({ token: refreshToken});

    if (!verifiedRefreshToken) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    //TODO: Непонятно с датой

    const newAccessToken = await jwtService.createAnyToken(String(verifiedRefreshToken), '10s');
    const newRefreshToken = await jwtService.createAnyToken(String(verifiedRefreshToken), '20s');

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: newAccessToken});
    return;
}