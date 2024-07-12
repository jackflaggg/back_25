import {PostCreateType, PostDbType} from "../../models/db/db.models";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {postsRepository} from "../../repositories/posts-db-repository";

export const postsService = {
    async createPost(post: PostCreateType): Promise<string | null> {
        return await postsRepository.createPost(post);
    },
    async putPost(post: InputUpdatePostModel, id: string): Promise<boolean> {
        return await postsRepository.putPost(post, id)
    },
    async delPost(id: string): Promise<boolean> {
        return await postsRepository.delPost(id);
    }
}