import {blogsCollections} from "../db/db";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {blogsRepositories} from "./blogs-db-repository";
import {blogMapper} from "../models/blog/mapper/blog-mapper";


export const blogsQueryRepositories = {
    async getAllBlog(): Promise<any> {
        const blogs = await blogsCollections
            .find()
            .toArray();
        return blogs.map(blog => blogMapper(blog));
    }
}
