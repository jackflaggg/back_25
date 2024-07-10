import {postsCollections} from "../db/db";
import {OutputPostModel} from "../models/post/output/post.output.models";
import {ObjectId} from "mongodb";
import {PostCreateType} from "../models/db/db.models";
import {InputUpdatePostModel} from "../models/post/input/update.post.input.models";
import {postMapper} from "../models/post/mapper/post-mapper";


export const postsRepository = {
    async getAllPost(): Promise<OutputPostModel[]> {
        const posts = await postsCollections
            .find()
            .toArray();
        return posts.map(post => postMapper(post))
    },
    async giveOneToIdPost(id: string): Promise<OutputPostModel | null> {
        const post = await postsCollections.findOne({_id: new ObjectId(id)});
        if (!post) {
            return null;
        }
        return postMapper(post)
    },
    async createPost(post: PostCreateType): Promise<string | null> {
        const newPost = await postsCollections.insertOne(post);
        if (!newPost || !newPost.insertedId) {
            return null;
        }
        return newPost.insertedId.toString();
    },
    async putPost(post: InputUpdatePostModel, id: string): Promise<boolean> {
        const updatePost = await postsCollections.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId
            }
        }, {upsert: true});
        return updatePost.acknowledged;
    },
    async delPost(id: string): Promise<boolean> {
        const deletePost = await postsCollections.deleteOne({_id: new ObjectId(id)});
        return deletePost.acknowledged;
    }
}