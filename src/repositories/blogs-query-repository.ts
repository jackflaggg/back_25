import {blogsCollections, postsCollections} from "../db/db";
import {blogMapper} from "../models/blog/mapper/blog-mapper";
import {QueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";
import {postMapper} from "../models/post/mapper/post-mapper";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {ObjectId} from "mongodb";


export const blogsQueryRepositories = {
    async getAllBlog(queryParamsToBlog: QueryBlogInputModels): Promise<any> {
        const blogs = await blogsCollections
            .find(queryParamsToBlog.searchNameTerm ? {name: {$regex: queryParamsToBlog.searchNameTerm, $options: 'i'}} : {})
            .sort(queryParamsToBlog.sortBy, queryParamsToBlog.sortDirection)
            .skip((Number(queryParamsToBlog.pageNumber) - 1) * Number(queryParamsToBlog.pageSize))
            .limit(Number(queryParamsToBlog.pageSize))
            .toArray();

        const totalCountBlogs = await blogsCollections.countDocuments(queryParamsToBlog.searchNameTerm ? { name: { $regex: queryParamsToBlog.searchNameTerm, $options: "i" }} : {});

        const pagesCount = Math.ceil(totalCountBlogs / Number(queryParamsToBlog.pageSize));

        return {
            pagesCount: +pagesCount,
            page: +queryParamsToBlog.pageNumber,
            pageSize: +queryParamsToBlog.pageSize,
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
        const posts = await postsCollections
            .find({blogId: paramsToBlogID})
            .sort(queryParamsPosts.sortBy, queryParamsPosts.sortDirection)
            .skip((Number(queryParamsPosts.pageNumber) - 1) * Number(queryParamsPosts.pageSize))
            .limit(Number(queryParamsPosts.pageSize))
            .toArray();

        const totalCountPosts = await postsCollections.countDocuments({blogId: paramsToBlogID});

        const pagesCount = Math.ceil(totalCountPosts / Number(queryParamsPosts.pageSize));

        return {
            pagesCount: +pagesCount,
            page: +queryParamsPosts.pageNumber,
            pageSize: +queryParamsPosts.pageSize,
            totalCount: +totalCountPosts,
            items: posts.map(post => postMapper(post))
        }
    }
}
