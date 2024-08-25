import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {JwtPayload} from "jsonwebtoken";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {handleError} from "../features/handle-error";

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


    const payload = await jwtService.verifyAccessToken(token)// as JwtPayload;
    console.log('проверь тут ошибку: ' + authHeaders, token, JSON.stringify(payload));
    if (!payload || payload.expired){
        handleError(res, 'Что то с данными: ' + payload)
        return;
    }

    const existingUser = await usersQueryRepository.getUserById(token);

    if (!existingUser){
        handleError(res, 'Что то с пользователем: ' + existingUser)
        return;
    }

    req.userId = existingUser.id;

    next();
}