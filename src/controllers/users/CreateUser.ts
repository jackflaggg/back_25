import {
    HTTP_STATUSES,
} from "../../models/common/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {InCreateUserModel} from "../../models/user/input/input-type-users";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request-response-params";
import {ErrorsType} from "../../models/common/errors/errors-type";
import {OutUserById} from "../../models/user/ouput/output-type-users";

export const createUserController = async (req: RequestWithBody<InCreateUserModel>,
                                           res:ResponseBody<ErrorsType | OutUserById>) => {

    const createdUserId = await userService.createUser(req.body);

    if (createdUserId.extensions) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(createdUserId.extensions);
        return;
    }

    const user = await usersQueryRepository.getUserById(createdUserId as string)

    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.CREATED_201).send(user);
    return;
}