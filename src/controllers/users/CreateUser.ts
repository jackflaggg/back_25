import {HTTP_STATUSES, RequestWithBody, ResponseBody, ResultStatus} from "../../models/common/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const createUserController = async (req: RequestWithBody<any>,
                                           res:ResponseBody<any>) => {
    const createdUserId = await userService.createUser(req.body);
    if (createdUserId.status !== ResultStatus.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errorsMessages: createdUserId.extensions || []})
        return
    }

    const user = await usersQueryRepository.getUserById(createdUserId as string)

    res.status(HTTP_STATUSES.CREATED_201).send(user);
}