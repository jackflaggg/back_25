import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {handleError} from "../features/handle-error";
import {isValidObjectIdToVerifyToken} from "../features/formatUserIdToAuth";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {userMapperToOutput} from "../mappers/user-mapper";

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
    console.log('Полученный айди: ', existingUserId);

    if (!existingUserId) {
        handleError(res, 'проблема с айди пользователем, мб невалиден: ' + existingUserId);
        return;
    }

    if (!isValidObjectIdToVerifyToken(existingUserId.toHexString())) {
        handleError(res, 'Неверный формат userId: ' + existingUserId);
        return;
    }

    const user = await usersQueryRepository.getUserById(String(existingUserId))
    console.log('че пришло в пользователе: ' + user)
    if (!user) {
        handleError(res, 'Пользователь не найден.');
        return;
    }
    const userMap = userMapperToOutput(user)

    req.userId = user;
    next();
}