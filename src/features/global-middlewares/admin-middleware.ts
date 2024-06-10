import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../types/types";
import {SETTINGS} from "../../settings";

// export const fromBase64ToUTF8 = (code: string) => {
//     const buff = Buffer.from(code, 'base64')
//     return buff.toString('utf8')
//
// }
export const fromUTF8ToBase64 = (code: string) => {
    const buffTwo = Buffer.from(code, 'utf8')
    return buffTwo.toString('base64')
}

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