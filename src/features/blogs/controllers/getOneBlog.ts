import {Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../../types/types";

export const OneBlogController = (req: RequestWithParams<BlogParamsModel>, res:Response) => {
    const getBlogId = blogsRepositories.getOneAndMap(req.params.id);
    res.status(HTTP_STATUSES.OK_200).send(getBlogId);
}