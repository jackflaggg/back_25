import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import { Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";

export const getInfoUserController = async (req: Request, res: Response) => {
    const existingId = req.userId;

    const user = await usersQueryRepository.getUserById(existingId as string);
    const mapUser = {
        email: user.email,
        login: user.login,
        userId: user.id
    }
    res.status(HTTP_STATUSES.OK_200).send(mapUser);
    return
}