import {Request, Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {HTTP_STATUSES} from "../../../types/types";

export const OneBlogController = (req: Request, res:Response) => {
    const getBlogId = blogsRepositories.getOneAndMap(req.params.id);
    res.status(HTTP_STATUSES.OK_200).send(getBlogId);
}