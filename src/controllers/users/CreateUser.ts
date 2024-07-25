import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const createUserController = async (req: RequestWithBody<any>,
                                           res:ResponseBody<any>) => {
    const createdUserId = await userService.createUser(req.body);

    const user = await usersQueryRepository.getUserById(createdUserId as string)

    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(user);
}