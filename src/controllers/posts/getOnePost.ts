import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";
import {ObjectId} from "mongodb";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {postsService} from "../../domain/post/post-service";
import {blogsService} from "../../domain/blog/blog-service";

export const OnePostController = async (req: RequestWithParams<PostParamsId>,
                                        res:Response) => {
    const { id: postId } = req.params;
    if (!ObjectId.isValid(postId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const blog = await blogsService.giveOneToIdBlog(postId);

    const getPostId = await postsService.giveOneToIdPost(postId);
    if (!getPostId) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}