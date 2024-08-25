import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import { Request, Response} from 'express';
import {AsyncVoid, HTTP_STATUSES} from "../../models/common/common-types";
import {jwtService} from "../../utils/application/jwt-service";

export const getInfoUserController = async (req: Request, res: Response): AsyncVoid => {
    const existingId = req.userId as string;

    if (!existingId) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return
    }

    const user = await usersQueryRepository.LoginMapByUser(existingId);

    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(user);
    return
}