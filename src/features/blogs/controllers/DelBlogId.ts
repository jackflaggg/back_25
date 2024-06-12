import {Response} from "express";
import {blogsRepositories} from "../../../repositories/blogs-repository";
import {BlogParamsModel, HTTP_STATUSES, RequestWithParams} from "../../../types/types";

export const deleteBlogController = (req: RequestWithParams<BlogParamsModel>, res:Response) => {
    console.log('delete log: ' + req.params.id)
    blogsRepositories.del(req.params.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}