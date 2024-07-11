import {postsCollections} from "../db/db";
import {postMapper} from "../models/post/mapper/post-mapper";
import {QueryPostInputModels} from "../models/post/input/get-query.post.input.models";
import {helperToPost} from "../middlewares/helper-query-get";
import {OutputPostModel} from "../models/post/output/post.output.models";
import {ObjectId} from "mongodb";

export const postsQueryRepository = {
    async getAllPost(queryParamsToPost: QueryPostInputModels): Promise<any> {

        const {pageNumber, pageSize, sortBy, sortDirection} = helperToPost(queryParamsToPost || {})

        const posts = await postsCollections
            .find()
            .sort(sortBy, sortDirection)
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();

        const totalCountBlogs = await postsCollections.countDocuments();

        const pagesCount = Math.ceil(totalCountBlogs / Number(pageSize));

        return {
            pagesCount: +pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCountBlogs,
            items: posts.map(post => postMapper(post)),
        };
    },
    async giveOneToIdPost(id: string): Promise<OutputPostModel | null> {
        const post = await postsCollections.findOne({_id: new ObjectId(id)});
        if (!post) {
            return null;
        }
        return postMapper(post)
    }
}