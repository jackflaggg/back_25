// import {Request, Response} from "express"
// import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";
// import {commentService} from "../../domain/comment/comment-service";
//
// export const createCommentByPostIdController = async (req: Request, res: Response) => {
//     const createdInfo = await commentService.createComment(req.params.postId, req.user.id, req.body)
//         if (createdInfo.status === ResultStatus.Unauthorized) {
//             res
//                 .status(HTTP_STATUSES.NOT_AUTHORIZATION)
//                 .json({errorsMessages: createdInfo.extensions || []})
//             return
//         }
//         if (createdInfo.status === ResultStatus.NotFound) {
//             res
//                 .status(HTTP_STATUSES.NOT_FOUND_404)
//                 .json({errorsMessages: createdInfo.extensions || []})
//             return
//         }
//         if (createdInfo.data && createdInfo.status === ResultStatus.Success) {
//             const newComment = await commentsMongoQueryRepository.getCommentById(createdInfo.data.id)
//             res
//                 .status(HTTP_STATUSES.CREATED_201)
//                 .json(newComment)
//             return
//         }
//     }