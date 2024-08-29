import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";
import {authService} from "../../domain/auth/auth-service";
import {ResultSuccess} from "../../models/common/errors/errors-type";
import {EmailBodyModel, RequestWithBody} from "../../models/common/req_res_params/request-response-params";
import {errorsMessages} from "../../utils/features/errorsMessages";

export const registrationEmailController = async (req: RequestWithBody<EmailBodyModel>, res: Response) => {
    const findEmail = await authService.registrationEmailResending(req.body.email);

    if (findEmail.status !== ResultSuccess.Success && findEmail.extensions) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsMessages(findEmail.extensions));
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}