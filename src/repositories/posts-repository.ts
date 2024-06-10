import {db} from "../db/db";
import {PostDbType} from "../types/types";
import {PostInputModel, PostViewModel} from "../input-output-types/posts-types";
import {v4 as uuidv4} from "uuid";
import {blogsRepositories} from "./blogs-repository";

const postId = uuidv4();

export const postsRepository = {
    getAll() : PostDbType[]{
        return db.posts ? db.posts : [];
    },
    giveOne(id: string)  {
        return db.posts.find(elem => elem.id === id);
    },
    giveOneAndMap(id: string): PostViewModel {
        const post = this.giveOne(id)!;
        return this.map(post)
    },
    create(post: PostInputModel): PostViewModel {
        const newPost = {
            id: postId,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogsRepositories.getOne(post.blogId)!.name,
        }
        db.posts.push(newPost);
        return newPost;
    },
    put(post: PostInputModel,id: string | number) {
        db.posts = db.posts.map(b => b.id === id ? {...b, ...post, id: b.id, blogName: blogsRepositories.getOne(b.id)!.name} : b)
    },
    del(id: string | number): void {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id){
                db.posts.splice(i, 1);
                return
            }
        }
    },
    map(post: PostDbType) {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
        }
        return postForOutput
    }
}