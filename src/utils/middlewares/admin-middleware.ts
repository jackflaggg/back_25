import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {SETTINGS} from "../../settings";
import {fromUTF8ToBase64} from "../features/UTF8ToBase64";

export const adminMiddlewares = (req: Request, res: Response, next:NextFunction) => {
    const {authorization: auth} = req.headers;

    if (!auth){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return;
    }

    if(!auth?.startsWith('Basic')){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return;
    }

    const codedAuthorization = fromUTF8ToBase64(SETTINGS.ADMIN);
    if(auth.slice(6) !== (codedAuthorization)){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return;
    }
    next();
}