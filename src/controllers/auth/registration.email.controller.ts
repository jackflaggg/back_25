import {Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {authService} from "../../domain/auth/auth.service";
import {ResultSuccess} from "../../models/common/errors/errors.type";
import {EmailBodyModel, RequestWithBody} from "../../models/common/req_res_params/request.response.params";
import {errorsMessages} from "../../utils/features/errors.messages";

export const registrationEmailController = async (req: RequestWithBody<EmailBodyModel>, res: Response) => {
    const findEmail= await authService.registrationEmailResending(req.body.email);

    if (findEmail.status !== ResultSuccess.Success && findEmail.extensions) {
        console.log(`[findEmail] либо истек, либо статус не совпал`);
        res.status(429).send(errorsMessages(findEmail.extensions));
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}