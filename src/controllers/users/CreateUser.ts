import {errors, HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const createUserController = async (req: RequestWithBody<any>,
                                           res:ResponseBody<any>) => {
    const createdUserId = await userService.createUser(req.body);

    if (!createdUserId) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    const user = await usersQueryRepository.getUserById(createdUserId)
    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(user);
}