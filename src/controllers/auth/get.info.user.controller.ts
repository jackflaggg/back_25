import {usersQueryRepository} from "../../repositories/users/users.query.repository";
import { Request } from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {ResponseBody} from "../../models/common/req_res_params/request.response.params";
import {OutLoginMapByUser} from "../../models/user/ouput/output.type.users";

export const getInfoUserController = async (req: Request, res: ResponseBody<OutLoginMapByUser>) => {
    const existingId = req.userId;

    if (!existingId) {
        console.log(`[existingId] не прошел авторизацию`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return
    }

    const user = await usersQueryRepository.LoginMapByUser(String(existingId));

    if (!user) {
        console.log(`[user] не был найден в репозитории`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(user);
    return
}