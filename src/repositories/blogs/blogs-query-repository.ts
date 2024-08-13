import {blogsCollections, postsCollections} from "../../db/db";
import {blogMapper} from "../../utils/mappers/blog-mapper";
import {QueryBlogInputModels} from "../../models/blog/input/get-query.blog.input.models";
import {postMapper} from "../../utils/mappers/post-mapper";
import {OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {ObjectId} from "mongodb";
import {helperToBlog} from "../../utils/helpers/helper-query-get";

export const blogsQueryRepositories = {
    async getAllBlog(queryParamsToBlog: QueryBlogInputModels): Promise<any> {
        const {searchNameTerm, sortBy, sortDirection, pageSize, pageNumber} = helperToBlog(queryParamsToBlog);
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
