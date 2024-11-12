import {CommentatorInfo} from "../../db/db.models";

export interface OutCommentModel {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
}
export interface OutGetAllCommentsModel {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutCommentModel[],
}