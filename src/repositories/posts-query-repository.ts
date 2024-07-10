import {postsCollections} from "../db/db";
import {OutputPostModel} from "../models/post/output/post.output.models";
import {postMapper} from "../models/post/mapper/post-mapper";


export const postsQueryRepository = {
    async getAllPost(): Promise<any> {
        const posts = await postsCollections
            .find()
            .toArray();
        return posts.map(post => postMapper(post))
    }
}