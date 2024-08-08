import {Response} from "express";
import {HTTP_STATUSES, RequestWithBody} from "../../models/common/common-types";
import {hashService} from "../../utils/application/hash-service";
import {loginControllerModels} from "../../models/auth/input/login-post-controller";
import {authService} from "../../domain/auth/auth-service";

export const loginController = async (req: RequestWithBody<loginControllerModels>, res: Response) => {

    const {loginOrEmail, password} = req.body

    const credentialLoginOrEmail = await authService.findUserByLoginOrEmail(loginOrEmail)

    if (!credentialLoginOrEmail) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const checkPassword = await hashService.comparePassword(password, credentialLoginOrEmail.password)

    if (!checkPassword){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)

}