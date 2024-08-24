import {Request, Response} from 'express';
import {authService} from "../../domain/auth/auth-service";
import {HTTP_STATUSES, ResultSuccess} from "../../models/common/common-types";

export const registrationController = async (req: Request, res: Response) => {
    const checkRegistrationUser = await authService.registrationUser(req.body);

    if (checkRegistrationUser.status !== ResultSuccess.Success) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkRegistrationUser.errors || checkRegistrationUser.extensions);
        return;
    }

    console.log(checkRegistrationUser)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return
}