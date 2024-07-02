import {Response} from "express";
import {HTTP_STATUSES, PostParamsId, RequestWithParams} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";
import {ObjectId} from "mongodb";
import {blogsRepositories} from "../../repositories/blogs-db-repository";

export const OnePostController = async (req: RequestWithParams<PostParamsId>,
                                        res:Response) => {
    const { id: postId } = req.params;
    if (!ObjectId.isValid(postId)) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const blog = await blogsRepositories.giveOneToIdBlog(postId);

    const getPostId = await postsRepository.giveOneToIdPost(postId);
    if (!getPostId) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200).send(getPostId);
}