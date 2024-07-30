import {Response} from "express";
import {HTTP_STATUSES, RequestWithBody} from "../../models/common/common-types";
import {hashService} from "../../utils/helpers/helper-hash";
import {loginControllerModels} from "../../models/auth/input/login-post-controller";
import {authService} from "../../domain/auth/auth-service";

export const loginController = async (req: RequestWithBody<loginControllerModels>, res: Response) => {

    const {loginOrEmail, password} = req.body

    const searchElem = await authService.findUserByLoginOrEmail(loginOrEmail)

    if (!searchElem) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const hashPassword = await hashService.comparePassword(password, searchElem.password)

    if (!hashPassword){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

}