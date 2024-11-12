import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common.types";
import {authService} from "../../domain/auth/auth.service";
import {ResultSuccess} from "../../models/common/errors/errors.type";
import {errorsMessages} from "../../utils/features/errors.messages";

export const registrationConfirmationController = async (req: Request, res: Response) => {
    const registrationConfirmation = await authService.confirmationEmailByCode(req.body.code);

    if (registrationConfirmation.status !== ResultSuccess.Success && registrationConfirmation.extensions) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorsMessages(registrationConfirmation.extensions));
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}