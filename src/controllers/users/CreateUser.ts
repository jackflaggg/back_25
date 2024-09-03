import {
    HTTP_STATUSES,
} from "../../models/common/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {InCreateUserModel} from "../../models/user/input/input-type-users";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request-response-params";
import {ErrorsType} from "../../models/common/errors/errors-type";
import {OutUserById} from "../../models/user/ouput/output-type-users";
import {OutCreateUserError} from "../../models/user/ouput/user-service-models";
import {errorsMessages} from "../../utils/features/errorsMessages";

export const createUserController = async (req: RequestWithBody<InCreateUserModel>,
                                           res:ResponseBody<ErrorsType | OutUserById>) => {

    const createdUserId = await userService.createUser(req.body);

    if (createdUserId instanceof OutCreateUserError) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errorsMessages(createdUserId.extensions));
        return;
    }

    const user = await usersQueryRepository.getUserById(createdUserId.data)

    if (!user) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .send(errorsMessages({field: 'error', message: 'непредвиденная ошибка, такого никогда не должно было произойти'}));
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(user);
    return;
}