import {HTTP_STATUSES} from "../../models/common/common.types";
import {Request, Response} from "express";
import {validateId} from "../../utils/helpers/helper.validate.id";
import {CommentsQueryRepository} from "../../repositories/comments/comments.query.repository";

export const getCommentIdController = async (req: Request,
                                           res: Response) => {
    const {id} = req.params;

    if (!validateId(id)){
        console.log(`[id] не прошел валидацию`);
        res.sendStatus(HTTP_STATUSES.NOT_FORBIDDEN_403);
        return;
    }

    const comment = await CommentsQueryRepository.getComment(id);

    if (!comment) {
        console.log(`[comment] в репозитории не вернул данные`);
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(comment);
    return;
}