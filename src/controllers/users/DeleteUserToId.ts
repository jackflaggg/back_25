import {Response} from "express";
import {HTTP_STATUSES, RequestWithParams} from "../../models/common/common-types";
import {ObjectId} from "mongodb";
import {blogsService} from "../../domain/blog/blog-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const deleteUserController = async (req: RequestWithParams<{id: string}>, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const user = await usersQueryRepository.getUserById(id)

    if (!user){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    const deleteBlog = await blogsService.delBlog(id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}