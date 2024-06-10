import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {postsRepository} from "../../../repositories/posts-repository";

export const AllPostController = (req: Request, res:Response) => {
    const getAllPosts = postsRepository.getAll();
    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}