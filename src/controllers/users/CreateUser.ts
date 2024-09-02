import {
    HTTP_STATUSES,
} from "../../models/common/common-types";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {InCreateUserModel} from "../../models/user/input/input-type-users";
import {helperError} from "../../utils/helpers/helper-error";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request-response-params";
import {ErrorsType, ResultSuccess} from "../../models/common/errors/errors-type";
import {OutUserById} from "../../models/user/ouput/output-type-users";

export const createUserController = async (req: RequestWithBody<InCreateUserModel>,
                                           res:ResponseBody<ErrorsType | OutUserById>) => {

    const createdUserId = await userService.createUser(req.body);

    if (createdUserId.status !== ResultSuccess.Success) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(helperError(createdUserId.data));
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