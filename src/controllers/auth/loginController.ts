import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";

export const loginController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body;
    if (!loginOrEmail || !password) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }
}