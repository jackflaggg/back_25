import {CommentsQueryRepository} from "../../../../src/repositories/comments/comments.query.repository";
import {inCreateUser, upComment} from "../helper-unit/comment.service.helper";
import {validateId} from "../../../../src/utils/helpers/helper.validate.id";
import {commentService} from "../../../../src/domain/comment/comment.service";
import {ResultStatus} from "../../../../src/models/common/errors/errors.type";
import {CommentsDbRepository} from "../../../../src/repositories/comments/comments.db.repository";


jest.mock('../../../src/utils/helpers/helper-validate-id', () => ({
    validateId: jest.fn(),
}));

jest.mock('../../../src/repositories/comments/comments-db-repository', () => ({
    CommentsDbRepository: {
        UpdateComment: jest.fn(),
        deleteComment: jest.fn(),
    }
}));

jest.mock('../../../src/repositories/comments/comments-query-repository', () => ({
    CommentsQueryRepository: {
        getComment: jest.fn(),
    }
}));

describe('commentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('updateComment', () => {
        it('⛔ null, если невалиден коммент айди', async() => {
            const user = inCreateUser();

            (validateId as jest.Mock).mockResolvedValue(false);

            const response = await commentService.updateComment(user.commentId, user.id, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {message: 'The comment to update is invalid', field: 'commentId'},
                data: null
            })
        });

        it('⛔ null, если коммент не найден', async() => {
            const user = inCreateUser();

            (validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(null)

            const response = await commentService.updateComment(user.commentId, user.id, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotFound,
                extensions: {message: 'The comment not found', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не соответствует юзеру', async() => {
            const user = inCreateUser();
            const wrongUserId = 'notTheUserId';
            const updateComment = upComment(user.id);

            (validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment)

            const response = await commentService.updateComment(user.commentId, wrongUserId, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.Forbidden,
                extensions: {message: 'The comment not user', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не удалось обновить!', async() => {
            const user = inCreateUser();

            const updateComment = upComment(user.id);

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.UpdateComment as jest.Mock).mockResolvedValueOnce(false);

            const response = await commentService.updateComment(user.commentId, user.id, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: null
            })
        });

        it('✅ успешное обновление коммента', async() => {
            const user = inCreateUser();

            const updateComment = upComment(user.id);

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.UpdateComment as jest.Mock).mockResolvedValueOnce(user.commentId);

            const response = await commentService.updateComment(user.commentId, user.id, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: user.commentId
            })
        });
    });

    describe('deleteComment', () => {
        it('⛔ null, если невалиден коммент айди', async() => {
            const user = inCreateUser();

            (validateId as jest.Mock).mockResolvedValueOnce(false);

            const response = await commentService.deleteComment(user.commentId, user.id);

            expect(response).toEqual({
                status: ResultStatus.BadRequest,
                extensions: {message: 'The comment to update is invalid', field: 'commentId'},
                data: null
            })
        });

        it('⛔ null, если коммент не найден', async() => {
            const user = inCreateUser();

            (validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(null)

            const response = await commentService.deleteComment(user.commentId, user.id);

            expect(response).toEqual({
                status: ResultStatus.NotFound,
                extensions: {message: 'The comment not found', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не соответствует юзеру', async() => {
            const user = inCreateUser();

            const updateComment = upComment(user.id);

            (validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment)

            const response = await commentService.deleteComment(user.commentId, user.id);

            expect(response).toEqual({
                status: ResultStatus.Forbidden,
                extensions: {message: 'The comment not user', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не удалось обновить!', async() => {
            const user = inCreateUser();

            const updateComment = upComment(user.id);

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.deleteComment as jest.Mock).mockResolvedValueOnce(false);

            const response = await commentService.deleteComment(user.commentId, user.id);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: null
            })
        });

        it('✅ успешное обновление коммента', async() => {
            const user = inCreateUser();

            const updateComment = upComment(user.id);

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.deleteComment as jest.Mock).mockResolvedValueOnce(user.commentId);

            const response = await commentService.deleteComment(user.commentId, user.id);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: user.commentId
            })
        });
    });
})