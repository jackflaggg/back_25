import {Response} from "express";
import {HTTP_STATUSES, RequestWithQuery} from "../../models/common/common-types";
import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import { queryHelperToBlog, queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";

export const AllPostController = async (req: RequestWithQuery<QueryPostInputModels>,
                                        res:Response) => {
    const queryPost = queryHelperToPost(req.query);
    const getAllPosts = await postsQueryRepository.getAllPost(queryPost)

    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}