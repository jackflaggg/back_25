import {Request, Response} from 'express';
import {authService} from "../../domain/auth/auth-service";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {ResultSuccess} from "../../models/common/errors/errors-type";
import {RequestWithBody} from "../../models/common/req_res_params/request-response-params";
import {InRegistrationModels} from "../../models/auth/input/login-post-controller";
import {errorsMessages} from "../../utils/features/errorsMessages";

export const registrationController = async (req: RequestWithBody<InRegistrationModels>, res: Response) => {
    const checkRegistrationUser = await authService.registrationUser(req.body);

    if (checkRegistrationUser.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsMessages(checkRegistrationUser.extensions || checkRegistrationUser.errors));
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}