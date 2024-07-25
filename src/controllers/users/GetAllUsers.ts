import {HTTP_STATUSES, RequestWithQuery} from "../../models/common-types";
import {Response} from "express";
import {helperToUser} from "../../middlewares/helper-query-get";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const AllUsersController = async (req: RequestWithQuery<any>,
                                        res:Response) => {
    const queryUser = helperToUser(req.query);
    const getAllUsers = await usersQueryRepository.getAllUsers(queryUser)

    res.status(HTTP_STATUSES.OK_200).send(getAllUsers);
}