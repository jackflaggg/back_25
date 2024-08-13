import {Response} from "express";
import {HTTP_STATUSES, RequestWithQuery} from "../../models/common/common-types";
import {queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {InQueryPostModel} from "../../models/post/input/input-type-posts";

export const AllPostController = async (req: RequestWithQuery<InQueryPostModel>,
                                        res:Response) => {
    const queryPost = queryHelperToPost(req.query);
    const getAllPosts = await postsQueryRepository.getAllPost(queryPost)

    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}