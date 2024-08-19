import {HTTP_STATUSES} from "../../models/common/common-types";
import { Response} from "express";

export const handleError = (res: Response, message: string) => {
    console.log(message);
    return  res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
};