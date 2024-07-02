import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common-types";
import {postsRepository} from "../../repositories/posts-db-repository";

export const AllPostController = async (req: Request,
                                        res:Response) => {
    const getAllPosts = await postsRepository.getAllPost();
    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}