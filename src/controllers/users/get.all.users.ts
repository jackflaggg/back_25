import {HTTP_STATUSES} from "../../models/common/common.types";
import {usersQueryRepository} from "../../repositories/users/users.query.repository";
import {queryHelperToUser} from "../../utils/helpers/helper.query.get";
import {RequestWithQuery, ResponseBody} from "../../models/common/req_res_params/request.response.params";
import {InQueryUserModel} from "../../models/user/helper-query-user/helper.user";
import {OutQueryCreateUsersModel} from "../../models/user/ouput/output.type.users";

export const AllUsersController = async (req: RequestWithQuery<InQueryUserModel>,
                                        res:ResponseBody<OutQueryCreateUsersModel>) => {
    const queryUser = queryHelperToUser(req.query);

    const getAllUsers = await usersQueryRepository.getAllUsers(queryUser)

    res.status(HTTP_STATUSES.OK_200).send(getAllUsers);
    return;
}