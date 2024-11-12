import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";

export const testVercelRouter = async (req: Request,
                                          res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send({version: '1.0'});
}