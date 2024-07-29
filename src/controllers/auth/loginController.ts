import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/common/common-types";
import {authQueryRepository} from "../../repositories/auth/auth-query-repository";
import {hashService} from "../../utils/helpers/helper-hash";

export const loginController = async (req: Request, res: Response) => {
    console.log(req.body)
    const {login, email, password} = req.body;

    const searchElem = await authQueryRepository.findUserByLoginOrEmail(login || email)

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