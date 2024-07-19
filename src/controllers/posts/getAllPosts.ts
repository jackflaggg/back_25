import {Response} from "express";
import {HTTP_STATUSES, RequestWithQuery} from "../../models/common-types";
import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import {helperToPost} from "../../middlewares/helper-query-get";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";

export const AllPostController = async (req: RequestWithQuery<QueryPostInputModels>,
                                        res:Response) => {
    const queryPost = helperToPost(req.query);
    const getAllPosts = await postsQueryRepository.getAllPost(queryPost)

    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}