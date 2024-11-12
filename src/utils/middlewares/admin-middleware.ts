import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {SETTINGS} from "../../settings";
import {fromUTF8ToBase64} from "../features/UTF8.to.Base64";

export const adminMiddlewares = (req: Request, res: Response, next:NextFunction) => {
    const {authorization: auth} = req.headers;

    if (!auth || !auth?.startsWith('Basic')){
        console.log(`[auth] ошибка в авторизации в заголовках`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    const codedAuthorization = fromUTF8ToBase64(SETTINGS.ADMIN);
    if(auth.slice(6) !== (codedAuthorization)){
        console.log(`[codedAuthorization] ошибка в декодировании`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    next();
}