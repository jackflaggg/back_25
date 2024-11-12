import {HTTP_STATUSES} from "../../models/common/common.types";
import { Response} from "express";

export const handleError = (res: Response, msg?: string) => {
    return res.status(HTTP_STATUSES.NOT_AUTHORIZATION_401).send({ errorsMessages: msg });
};