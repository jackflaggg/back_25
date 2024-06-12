import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-in-memory-repository";
import {HTTP_STATUSES} from "../../../types/types";
import {postsInMemoryRepository} from "../../../repositories/posts-in-memory-repository";

export const AllPostController = (req: Request, res:Response) => {
    const getAllPosts = postsInMemoryRepository.getAll();
    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
}