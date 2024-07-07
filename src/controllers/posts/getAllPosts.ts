import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";
import {postsService} from "../../domain/post/post-service";

export const AllPostController = async (req: Request,
                                        res:Response) => {
    const getAllPosts = await postsService.getAllPost();
    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}