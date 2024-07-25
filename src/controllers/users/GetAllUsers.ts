import {HTTP_STATUSES, RequestWithQuery} from "../../models/common-types";
import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import {Response} from "express";
import {helperToPost, helperToUser} from "../../middlewares/helper-query-get";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const AllUsersController = async (req: RequestWithQuery<any>,
                                        res:Response) => {
    const queryUser = helperToUser(req.query);

    const getAllUsers = await usersQueryRepository.getAllUsers(queryUser)

    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}