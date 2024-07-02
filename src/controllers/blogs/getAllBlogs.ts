import {Request} from "express";
import {HTTP_STATUSES, ResponseBody} from "../../models/common-types";
import {blogsRepositories} from "../../repositories/blogs-db-repository";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";

export const AllBlogController = async (req: Request,
                                        res:ResponseBody<OutputBlogModel[]>) => {
    const allBlogs = await blogsRepositories.getAllBlog()
    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
}