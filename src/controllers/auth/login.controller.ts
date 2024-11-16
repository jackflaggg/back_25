import {
    AccessToken,
    HTTP_STATUSES,
} from "../../models/common/common.types";
import {InLoginModels} from "../../models/auth/input/login.post.controller";
import {authService} from "../../domain/auth/auth.service";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request.response.params";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";
import {SETTINGS} from "../../settings";

export const loginController = async (req: RequestWithBody<InLoginModels>, res: ResponseBody<AccessToken>) => {

    const userAgent = req.headers["user-agent"] || SETTINGS.userAgent!;
    const ipDevice = req.ip || SETTINGS.ipTest!;

    const loginUser = await authService.loginUser(req.body, ipDevice, userAgent);
    console.log(loginUser)
    if (loginUser instanceof ErrorAuth || loginUser.data === null) {
        console.log('[loginUser] не прошел авторизацию, либо его вовсе не существует');
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    res.cookie('refreshToken', loginUser.data.refresh, {httpOnly: true, secure: true});
    res.status(HTTP_STATUSES.OK_200).send({accessToken: loginUser.data.jwt});
    return;
}