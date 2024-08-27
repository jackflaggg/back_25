import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";
import {authService} from "../../domain/auth/auth-service";
import {ResultSuccess} from "../../models/errors/errors-type";

export const registrationConfirmationController = async (req: Request, res: Response) => {
    const registrationConfirmation = await authService.confirmationEmailByCode(req.body.code);

    if (registrationConfirmation.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(JSON.parse(JSON.stringify(registrationConfirmation.extensions)));
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}