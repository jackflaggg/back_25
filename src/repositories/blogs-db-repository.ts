import {blogsCollections} from "../db/db";
import {OutputBlogModel} from "../models/blog/output/blog.output.models";
import {ObjectId} from "mongodb";
import {BlogCreateType} from "../models/db/db.models";
import {InputUpdateBlogModel} from "../models/blog/input/update.blog.input.models";
import {blogMapper} from "../models/blog/mapper/blog-mapper";

export const blogsRepositories = {
    async createBlog(blog: BlogCreateType): Promise<string | null>{
        const newBlog = await blogsCollections.insertOne(blog)
        if (!newBlog || !newBlog.insertedId) {
            return null;
        }
        return newBlog.insertedId.toString();
    },
    async putBlog(id: string, blog: InputUpdateBlogModel): Promise<boolean> {
        const updateBlog = await blogsCollections.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            }, {upsert: true})
            return updateBlog && updateBlog.acknowledged
    },
    async delBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsCollections.deleteOne({_id: new ObjectId(id)});
        return deleteBlog.acknowledged;
    }
}
