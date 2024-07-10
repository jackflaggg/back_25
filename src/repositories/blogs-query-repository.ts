import {blogsCollections} from "../db/db";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {blogsRepositories} from "./blogs-db-repository";
import {blogMapper} from "../models/blog/mapper/blog-mapper";
import {QueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";
import {defaultQueryParameters, helper} from "../middlewares/helper-query-get";


export const blogsQueryRepositories = {
    async getAllBlog(queryParams: QueryBlogInputModels): Promise<any> {
        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = helper(queryParams!/*queryParams*/);

        const blogs = await blogsCollections
            .find(searchNameTerm ? {name: {$regex: searchNameTerm, $options: 'i'}} : {})
            .sort(sortBy, sortDirection)
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();
        const totalCountBlogs = await blogsCollections.countDocuments(searchNameTerm ? { name: { $regex: searchNameTerm, $options: "i" }} : {})
        const pagesCount = Math.ceil(totalCountBlogs / Number(pageSize));
        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCountBlogs,
            items: blogs.map(blog => blogMapper(blog)),
        }
    }
}
