import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {loginControllerModels} from "../../models/auth/input/login-post-controller";
import {authService} from "../../domain/auth/auth-service";

export const loginController = async (req: RequestWithBody<loginControllerModels>, res: ResponseBody<{ accessToken: string}>) => {

    const loginUser = await authService.loginUser(req.body);

    if (!loginUser) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    return res.status(HTTP_STATUSES.OK_200).send({accessToken: loginUser})

}