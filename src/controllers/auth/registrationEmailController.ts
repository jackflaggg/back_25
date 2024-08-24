import {Request, Response} from 'express';
import {HTTP_STATUSES, ResultSuccess} from "../../models/common/common-types";
import {emailAdapter} from "../../utils/adapters/email-adapter";
import {emailManagers} from "../../managers/email-managers";
import {authService} from "../../domain/auth/auth-service";

export const registrationEmailController = async (req: Request, res: Response) => {
    const findEmail = await authService.registrationEmailResending(req.params.email);
    if (findEmail.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(findEmail.extensions);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}