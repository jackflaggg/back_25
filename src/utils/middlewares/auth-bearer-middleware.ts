import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {handleError} from "../features/handle-error";
import {isValidObjectIdToVerifyToken} from "../features/formatUserIdToAuth";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const authBearerMiddlewares = async (req: Request, res: Response, next:NextFunction) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        handleError(res, `Что то с заголовком: ${authHeaders}`);
        return;
    }

    const token = authHeaders.split(' ')[1];

    // if (!token) {
    //     handleError(res, `Нет токена: ${token}`);
    //     return;
    // }

    const existingUserId = await jwtService.getUserIdByToken(token);

    if (!existingUserId) {
        handleError(res, `проблема с айди пользователем, мб невалиден: ${existingUserId}`);
        return;
    }
    console.log(2)
    if (!isValidObjectIdToVerifyToken(existingUserId)) {
        handleError(res, `Неверный формат userId: ${existingUserId}`);
        return;
    }
    console.log(3)
    const user = await usersQueryRepository.getUserById(existingUserId)
    console.log(4)
    if (!user) {
        handleError(res, `Пользователь не найден: ${user}`);
        return;
    }

    req.userId = user.id;
    next();
}