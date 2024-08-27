import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../../models/common/common-types";
import {authService} from "../../domain/auth/auth-service";
import {ResultSuccess} from "../../models/errors/errors-type";

export const registrationEmailController = async (req: Request, res: Response) => {
    const findEmail = await authService.registrationEmailResending(req.body.email);
    if (findEmail.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(JSON.parse(JSON.stringify(findEmail.extensions)));
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
}