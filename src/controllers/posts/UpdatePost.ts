import {Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {postsService} from "../../domain/post/post-service";
import {postsQueryRepository} from "../../repositories/posts/posts-query-repository";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {validateId} from "../../utils/helpers/helper-validate-id";
import {InUpdatePostModel} from "../../models/post/input/input-type-posts";
import {PostParamsId, RequestWithParamsAndBody} from "../../models/common/req_res_params/request-response-params";

export const updatePostController = async (req: RequestWithParamsAndBody<PostParamsId, InUpdatePostModel>,
                                           res:Response) => {
    const { id } = req.params;

    if (!validateId(id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const post = await postsQueryRepository.giveOneToIdPost(id);
    if (!post){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const blog = await blogsQueryRepositories.giveOneToIdBlog(req.body.blogId);
    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const isUpdatedPost = await postsService.putPost(req.body, blog, id);
    if (!isUpdatedPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
}