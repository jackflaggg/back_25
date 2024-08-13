import {blogsCollections, postsCollections} from "../../db/db";
import {blogMapper} from "../../utils/mappers/blog-mapper";
import {postMapper} from "../../utils/mappers/post-mapper";
import {OutGetAllBlogs, OutputBlogModel} from "../../models/blog/output/output-type-blogs";
import {ObjectId} from "mongodb";
import {queryHelperToBlog} from "../../utils/helpers/helper-query-get";
import {InQueryBlogModel} from "../../models/blog/input/input-type-blogs";

export const blogsQueryRepositories = {
    async getAllBlog(queryParamsToBlog: InQueryBlogModel): Promise<OutGetAllBlogs> {
        const {searchNameTerm, sortBy, sortDirection, pageSize, pageNumber} = queryHelperToBlog(queryParamsToBlog);
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
    async giveOneToIdBlog(blogId: string): Promise<OutputBlogModel | null> {
        const blog = await blogsCollections.findOne({_id: new ObjectId(blogId)});

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
