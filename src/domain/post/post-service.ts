import {OutputPostModel} from "../../models/post/output/post.output.models";
import {PostCreateType, PostDbType} from "../../models/db/db.models";
import {InputUpdatePostModel} from "../../models/post/input/update.post.input.models";
import {postsRepository} from "../../repositories/posts-db-repository";
import {postsQueryRepository} from "../../repositories/posts-query-repository";


export const postsService = {
    async getAllPost(): Promise<OutputPostModel[]> {
        return await postsQueryRepository.getAllPost();
    },
    async giveOneToIdPost(id: string): Promise<OutputPostModel | null> {
        return await postsRepository.giveOneToIdPost(id);
    },
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