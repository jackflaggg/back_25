import {authService} from "../../domain/auth/auth-service";
import {Request, Response} from "express";
import {HTTP_STATUSES, ResultStatus} from "../../models/common/common-types";

export const loginController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body;
    if (!loginOrEmail || !password) {
        res.sendStatus(400);
        return
    }
    const result = await authService.loginUser(req.body)
    if (result.status === ResultStatus.Unauthorized) {
        res
            .status(HTTP_STATUSES.NOT_AUTHORIZATION)
            .send({errorsMessages: result.extensions || []})
        return
    }
    if (result.status === ResultStatus.Success) {
        res
            .status(HTTP_STATUSES.OK_200)
            .send(result.data)
        return
    }
}