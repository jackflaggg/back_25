import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParamsAndBody} from "../../models/common-types";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {ObjectId} from "mongodb";
import {postsService} from "../../domain/post/post-service";
import {postsQueryRepository} from "../../repositories/posts-query-repository";
import {blogsQueryRepositories} from "../../repositories/blogs-query-repository";

export const updatePostController = async (req: RequestWithParamsAndBody<PostParamsId, InputUpdatePostModel>,
                                           res:Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
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
}