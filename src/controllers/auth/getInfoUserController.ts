import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import { Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";

export const getInfoUserController = async (req: Request, res: Response) => {
    const existingId = req.userId;

    if (!existingId) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const user = await usersQueryRepository.LoginMapByUser(existingId as string)
    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(user);
    return
}