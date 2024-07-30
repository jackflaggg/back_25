import {Response} from "express";
import {HTTP_STATUSES, RequestWithBody} from "../../models/common/common-types";
import {authQueryRepository} from "../../repositories/auth/auth-query-repository";
import {hashService} from "../../utils/helpers/helper-hash";
import {loginControllerModels} from "../../models/auth/input/login-post-controller";

export const loginController = async (req: RequestWithBody<loginControllerModels>, res: Response) => {

    const {loginOrEmail, password} = req.body

    const searchElem = await authQueryRepository.findUserByLoginOrEmail(loginOrEmail)

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