import {HTTP_STATUSES} from "../../models/common/common-types";
import {Response} from "express";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {queryHelperToUser} from "../../utils/helpers/helper-query-get";
import {RequestWithQuery} from "../../models/common/req_res_params/request-response-params";

export const AllUsersController = async (req: RequestWithQuery<any>,
                                        res:Response) => {
    const queryUser = queryHelperToUser(req.query);
    const getAllUsers = await usersQueryRepository.getAllUsers(queryUser)

    res.status(HTTP_STATUSES.OK_200).send(getAllUsers);
    return;
}