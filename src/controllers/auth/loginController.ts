import {authService} from "../../domain/auth/auth-service";
import {Request, Response} from "express";
import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";

export const loginController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body;
    if (!loginOrEmail || !password) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }
    const result = await authService.loginUser(loginOrEmail, password)
    if (result.status === ResultStatus.Unauthorized) {
        res
            .status(HTTP_STATUSES.NOT_AUTHORIZATION)
            .send({errorsMessages: result.extensions || []})
        return
    }
    if (result.status === ResultStatus.Success) {
        res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(result.data)
        return
    }
}