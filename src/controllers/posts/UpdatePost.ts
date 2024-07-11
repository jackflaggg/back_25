import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParamsAndBody} from "../../models/common-types";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {ObjectId} from "mongodb";
import {PostUpdateType} from "../../models/db/db.models";
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

    const { title, shortDescription, content, blogId} = req.body;

    const post = await postsQueryRepository.giveOneToIdPost(id);
    const blog = await blogsQueryRepositories.giveOneToIdBlog(blogId);

    if (!blog){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    if (!post){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    const upPost: PostUpdateType = {
        title, shortDescription, content, blogId, blogName: blog!.name
    }

    const isUpdatedPost = await postsService.putPost(upPost, id);
    if (!isUpdatedPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}