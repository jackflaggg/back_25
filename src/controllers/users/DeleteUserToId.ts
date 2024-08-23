import {Response} from "express";
import {HTTP_STATUSES, RequestWithParams} from "../../models/common/common-types";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";
import {userService} from "../../domain/user/user-service";
import {validateId} from "../../utils/helpers/helper-validate-id";

export const deleteUserController = async (req: RequestWithParams<{id: string}>, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!validateId(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const user = await usersQueryRepository.getUserById(id)

    if (!user){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const deleteBlog = await userService.delUser(user);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}