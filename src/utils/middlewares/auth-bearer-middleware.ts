import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {handleError} from "../features/handle-error";
import jwt from "jsonwebtoken";

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


    next();
}