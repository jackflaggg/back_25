import {blogsCollections, postsCollections} from "../db/db";
import {blogMapper} from "../models/blog/mapper/blog-mapper";
import {QueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";
import {helperToBlog, helperToPost} from "../middlewares/helper-query-get";
import {postMapper} from "../models/post/mapper/post-mapper";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {ObjectId} from "mongodb";


export const blogsQueryRepositories = {
    async getAllBlog(queryParamsToBlog: QueryBlogInputModels): Promise<any> {
        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = helperToBlog(queryParamsToBlog || {}/*queryParams*/);

        const blogs = await blogsCollections
            .find(searchNameTerm ? {name: {$regex: searchNameTerm, $options: 'i'}} : {})
            .sort(sortBy, sortDirection)
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();

        const totalCountBlogs = await blogsCollections.countDocuments(searchNameTerm ? { name: { $regex: searchNameTerm, $options: "i" }} : {});

        const pagesCount = Math.ceil(totalCountBlogs / Number(pageSize));

        return {
            pagesCount: +pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCountBlogs,
            items: blogs.map(blog => blogMapper(blog)),
        };
    },
    async giveOneToIdBlog(id: string): Promise<OutputBlogModel | null> {
        const blog = await blogsCollections.findOne({_id: new ObjectId(id)});

        if (blog === null) {
            return null;
        }
        return blogMapper(blog)
    },
    async getPostsToBlogID(paramsToBlogID: string, queryParamsPosts?: any): Promise<any> {
        const { pageNumber, pageSize, sortBy, sortDirection} = helperToPost(queryParamsPosts || {}/*queryParams*/);

        const posts = await postsCollections
            .find({blogId: paramsToBlogID})
            .sort(sortBy, sortDirection)
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();

        const totalCountPosts = await postsCollections.countDocuments({blogId: paramsToBlogID});

        const pagesCount = Math.ceil(totalCountPosts / Number(pageSize));

        return {
            pagesCount: +pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCountPosts,
            items: posts.map(post => postMapper(post))
        }
    },
    async createPostToBlogID(blogId: any, bodyPost: any): Promise<any> {

    }
}
