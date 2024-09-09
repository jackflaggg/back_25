import {createString} from "../../helpers-e2e/datatests";
import {CommentsQueryRepository} from "../../../src/repositories/comments/comments-query-repository";
import {CommentsDbRepository} from "../../../src/repositories/comments/comments-db-repository";
import {validateId} from "../../../src/utils/helpers/helper-validate-id";
import {inCreateUser, upComment} from "../helper-unit/comment.service.helper";
import {commentService} from "../../../src/domain/comment/comment-service";
import {ResultStatus} from "../../../src/models/common/errors/errors-type";
import {ObjectId} from "mongodb";

jest.mock('../../../src/repositories/comments/comments-db-repository', () => ({
    CommentsDbRepository: {
        UpdateComment: jest.fn(),
        deleteComment: jest.fn(),
    }
}));

jest.mock('../../../src/utils/helpers/helper-validate-id', () => ({
    validateId: jest.fn(),
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

            console.log(ObjectId.isValid(createString(11)));
            (ObjectId.isValid as jest.Mock).mockResolvedValueOnce(ObjectId.isValid(createString(11)));

            const response = await commentService.updateComment(user.commentId, user.userId, user.inputComment);

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

            const response = await commentService.updateComment(user.commentId, user.userId, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotFound,
                extensions: {message: 'The comment not found', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не соответствует юзеру', async() => {
            const user = inCreateUser();

            const updateComment = upComment();

            (validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment)

            const response = await commentService.updateComment(user.commentId, user.userId, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.Forbidden,
                extensions: {message: 'The comment not user', field: 'comment'},
                data: null
            })
        });

        it('⛔ null, если коммент не удалось обновить!', async() => {
            const user = inCreateUser();

            const updateComment = upComment();

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.UpdateComment as jest.Mock).mockResolvedValueOnce(false);

            const response = await commentService.updateComment(user.commentId, user.userId, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: null
            })
        });

        it('✅ успешное обновление коммента', async() => {
            const user = inCreateUser();

            const updateComment = upComment();

            //(validateId as jest.Mock).mockResolvedValueOnce(true);

            (CommentsQueryRepository.getComment as jest.Mock).mockResolvedValueOnce(updateComment);

            (CommentsDbRepository.UpdateComment as jest.Mock).mockResolvedValueOnce(user.commentId);

            const response = await commentService.updateComment(user.commentId, user.userId, user.inputComment);

            expect(response).toEqual({
                status: ResultStatus.NotContent,
                data: user.commentId
            })
        });
    });

    // describe('deleteComment', () => {
    //     it('✅ создание поста для блога', async() => {
    //         const expectedId = new ObjectId().toString();
    //         (blogsRepositories.createPostToBlogID as jest.Mock).mockResolvedValueOnce(expectedId);
    //
    //         let InCreateToBlogModel = {
    //             id: new ObjectId().toString(),
    //             name: createString(10),
    //         }
    //
    //         let InCreatePostToBlogInputModel = {
    //             title: createString(10),
    //             shortDescription: createString(10),
    //             content: createString(10)
    //         }
    //
    //         const response = await blogsService.createPostToBlogInputModel(InCreateToBlogModel,InCreatePostToBlogInputModel);
    //
    //         expect(response).toBe(expectedId)
    //     });
    //
    //     it('⛔ null при создании поста для блога', async() => {
    //
    //         (blogsRepositories.createPostToBlogID as jest.Mock).mockResolvedValueOnce(null);
    //
    //         let InCreateToBlogModel = {
    //             id: new ObjectId().toString(),
    //             name: createString(10),
    //         }
    //
    //         let InCreatePostToBlogInputModel = {
    //             title: createString(10),
    //             shortDescription: createString(10),
    //             content: createString(10)
    //         }
    //
    //         const response = await blogsService.createPostToBlogInputModel(InCreateToBlogModel,InCreatePostToBlogInputModel);
    //
    //         expect(response).toBe(null)
    //     });
    // });
})