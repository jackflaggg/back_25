import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {jwtService} from "../application/jwt-service";
import {JwtPayload} from "jsonwebtoken";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const authBearerMiddlewares = async (req: Request, res: Response, next:NextFunction) => {
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);

    if(!authHeaders){
        console.log('Что то с заголовком: ' + authHeaders);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const token = authHeaders.split(' ')[1];

    if (!token) {
        console.log('Нет токена: ' + token)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const payload = await jwtService.verifyToken(token) as JwtPayload

    if (!payload){
        console.log('Что то с данными, смотри объект: ' + payload)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const { userId } = payload;
    const existingUser = await usersQueryRepository.getUserById(userId);

    if (!existingUser){
        console.log('Пользователь в мидле не найден: ' + existingUser)
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    req.userId = existingUser.id;

    next();
}