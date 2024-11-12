import {Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common.types";
import {usersQueryRepository} from "../../repositories/users/users.query.repository";
import {userService} from "../../domain/user/user.service";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {RequestWithParams, UserParamsIdDeleteModel} from "../../models/common/req_res_params/request.response.params";

export const deleteUserController = async (req: RequestWithParams<UserParamsIdDeleteModel>, res: Response) => {
    const { id } = req.params;

    if (!validateId(id)){
        console.log(`[id] не прошел валидацию`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const user = await usersQueryRepository.getUserById(id)

    if (!user){
        console.log(`[user] не был найден в репозитории`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const deleteBlog = await userService.delUser(user.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}