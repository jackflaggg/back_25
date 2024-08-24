import {Request, Response} from 'express';
import {config} from 'dotenv';
import {HTTP_STATUSES} from "../../models/common/common-types";
import {authService} from "../../domain/auth/auth-service";
config()

export const registrationConfirmationController = async (req: Request, res: Response) => {
    const registrationConfirmation = await authService.confirmationEmailByCode(req.body.code);

    if (!registrationConfirmation) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send();
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}