import {Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-in-memory-repository";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../../types/types";

export const OneBlogController = (req: RequestWithParams<BlogParamsModel>, res:Response) => {
    console.log(`get id: ${req.params.id}`);
    const getBlogId = blogsRepositories.getOneAndMap(req.params.id);
    console.log('send blog ' + getBlogId)
    res.status(HTTP_STATUSES.OK_200).send(getBlogId);
}