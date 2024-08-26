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


    const decodedToken = await jwtService.decodeToken(token);

    console.log('вот декод данные: ' + JSON.stringify(decodedToken))

    if (!decodedToken) {
        handleError(res, 'Что то с декод данными: ' + JSON.stringify(decodedToken))
        return;
    }
    const payload = await jwtService.verifyAccessToken(token)// as JwtPayload;

    if (!payload || payload.expired){
        handleError(res, 'Что то с данными: ' + payload)
        return;
    }

    const existingUser = await usersQueryRepository.getUserById(decodedToken!.userId);
    console.log('я продвинулся дальше: ' + existingUser);
    if (!existingUser){
        handleError(res, 'Что то с пользователем: ' + existingUser)
        return;
    }

    req.userId = existingUser.id;

    next();
}