import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParamsAndBody} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {ObjectId} from "mongodb";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {PostUpdateType} from "../../models/db/db.models";
import {postsService} from "../../domain/post/post-service";
import {blogsService} from "../../domain/blog/blog-service";

export const updatePostController = async (req: RequestWithParamsAndBody<PostParamsId, InputUpdatePostModel>,
                                           res:Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    const { title, shortDescription, content, blogId} = req.body;
    const post = await postsService.giveOneToIdPost(id);
    const blog = await blogsService.giveOneToIdBlog(blogId);

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