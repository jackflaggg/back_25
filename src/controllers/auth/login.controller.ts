import {
    AccessToken,
    HTTP_STATUSES,
} from "../../models/common/common.types";
import {InLoginModels} from "../../models/auth/input/login.post.controller";
import {authService} from "../../domain/auth/auth.service";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request.response.params";
import {LoginErrorTwo} from "../../models/auth/ouput/auth.service.models";
import {SecurityDevicesDbRepository} from "../../repositories/security-devices/security.devices.db.repository";

export const loginController = async (req: RequestWithBody<InLoginModels>, res: ResponseBody<AccessToken>) => {

    const userAgent = req.headers["user-agent"] || "new device"
    const ipDevice = req.ip || "228.228.228.228"


    const loginUser = await authService.loginUser(req.body, String(ipDevice), String(userAgent));

    if (loginUser instanceof LoginErrorTwo || loginUser.data === null) {
        console.log(`[loginUser] не прошел авторизацию, либо его вовсе не существует`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }
    const dateSession = {
        deviceId: '1',
        userId: '1',
        ip: ipDevice,
        deviceName: userAgent,
        refreshToken: '1'
    }
    await SecurityDevicesDbRepository.createSession(dateSession);

    res.cookie('refreshToken', loginUser.data.refresh, {httpOnly: true, secure: true});
    res.status(HTTP_STATUSES.OK_200).send({accessToken: loginUser.data.jwt});
    return;
}