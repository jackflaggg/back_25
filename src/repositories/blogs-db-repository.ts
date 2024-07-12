import {blogsCollections} from "../db/db";
import {ObjectId} from "mongodb";
import {BlogCreateType} from "../models/db/db.models";
import {InputUpdateBlogModel} from "../models/blog/input/update.blog.input.models";
import {InputCreateBlogModel} from "../models/blog/input/create.blog.input.models";

export const blogsRepositories = {
    async createBlog(blog: InputCreateBlogModel): Promise<string | null>{
        // не должно быть в реп
        const bodyBlog: BlogCreateType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        const newBlog = await blogsCollections.insertOne(bodyBlog)
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
