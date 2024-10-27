import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";
export const getAllActiveSessionsController = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    res
        .status(HTTP_STATUSES.OK_200)
        .send({refreshToken});
    return;
}