import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {blackListTokenCollection} from "../../db/db";

export const logoutController = async (req: Request, res: Response) => {

    const {refreshToken} = req.cookies;
    //TODO: Непонятно с датой
    const blackListToken = await blackListTokenCollection.insertOne({ token: refreshToken});

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}