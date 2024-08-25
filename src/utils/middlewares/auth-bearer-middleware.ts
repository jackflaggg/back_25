import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {JwtPayload} from "jsonwebtoken";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {handleError} from "../features/handle-error";
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

    const payload = await jwtService.verifyAccessToken(token) as JwtPayload;

    if (!payload){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401)
        //handleError(res, 'Что то с данными: ' + payload)
        return;
    }

    const existingUser = await usersQueryRepository.getUserById(payload.userId);

    if (!existingUser){
        handleError(res, 'Что то с пользователем: ' + existingUser)
        return;
    }

    req.userId = existingUser.id;

    next();
}