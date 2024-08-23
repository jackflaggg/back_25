import {Request, Response} from 'express';
import {authService} from "../../domain/auth/auth-service";
import {HTTP_STATUSES} from "../../models/common/common-types";

export const registrationController = async (req: Request, res: Response) => {
    const checkRegistrationUser = await authService.registrationUser(req.body);
    if (!checkRegistrationUser) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
    res.sendStatus(HTTP_STATUSES.CREATED_201);
    return
}