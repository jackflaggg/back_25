import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {blackListTokenCollection} from "../../db/db";
import {jwtService} from "../../utils/application/jwt-service";

export const logoutController = async (req: Request, res: Response) => {
    console.log('я токен: ' + req.cookies.refreshToken)
    const {refreshToken} = req.cookies;

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);
    console.log('я возвращаенный токен в логауте: ' + verifiedRefreshToken);
    if (!verifiedRefreshToken) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    //TODO: Непонятно с датой
    const blackListToken = await blackListTokenCollection.insertOne({ token: refreshToken});

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}