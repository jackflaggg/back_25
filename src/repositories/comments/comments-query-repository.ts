import {commentsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {InQueryPostModel} from "../../models/post/input/input-type-posts";
import {queryHelperToPost} from "../../utils/helpers/helper-query-get";
import {commentMapper} from "../../utils/mappers/comment-mapper";

export const CommentsQueryRepository = {
    async getComment(idComment: string) {
        const comment = await commentsCollection.findOne({ _id: new ObjectId(idComment)});
        console.log('query: ' + JSON.stringify(comment))
        if (!comment) {
            return null;
        }

        return commentMapper(comment);
    },
    async getAllCommentsToPostId(paramsToPostId: string, queryComments: InQueryPostModel) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryHelperToPost(queryComments);

        const comments = await commentsCollection
            .find({postId: paramsToPostId})
            .sort(sortBy, sortDirection)
            .skip((Number(pageNumber) - 1) * Number(pageSize))
            .limit(Number(pageSize))
            .toArray();

        const totalCountComments = await commentsCollection.countDocuments({postId: paramsToPostId});

        const pagesCount = Math.ceil(totalCountComments / Number(pageSize));
        console.log(comments)
        return {
            pagesCount: +pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCountComments,
            items: comments.map(comments => commentMapper(comments))
        }
    },
}