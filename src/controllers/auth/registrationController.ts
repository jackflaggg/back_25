import {Request, Response} from 'express';
import {authService} from "../../domain/auth/auth-service";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {ResultSuccess} from "../../models/common/errors/errors-type";

export const registrationController = async (req: Request, res: Response) => {
    const checkRegistrationUser = await authService.registrationUser(req.body);

    if (checkRegistrationUser.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkRegistrationUser.errors || checkRegistrationUser.extensions);
        return;
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}