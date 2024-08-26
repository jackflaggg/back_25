import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {handleError} from "../features/handle-error";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {HTTP_STATUSES} from "../../models/common/common-types";

export const authBearerMiddlewares = async (req: Request, res: Response, next:NextFunction) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        handleError(res, 'Что то с заголовком: ' + authHeaders);
        return;
    }

    const token = authHeaders.split(' ')[1];

    if (!token) {
        handleError(res, 'Нет токена: ' + token);
        return;
    }

    const existingUserId = await jwtService.getUserIdByToken(token);

    console.log(typeof existingUserId, existingUserId);

    if (!existingUserId) {
        console.log(existingUserId);
        handleError(res, 'проблема с айди пользователем, мб невалиден: ' + existingUserId);
        return;
    }

    req.userId = existingUserId;
    next();
}