import {
    AccessToken,
    HTTP_STATUSES,
} from "../../models/common/common-types";
import {InLoginModels} from "../../models/auth/input/login-post-controller";
import {authService} from "../../domain/auth/auth-service";
import {ResultSuccess} from "../../models/common/errors/errors-type";
import {RequestWithBody, ResponseBody} from "../../models/common/req_res_params/request-response-params";
import {jwtService} from "../../utils/application/jwt-service";

export const loginController = async (req: RequestWithBody<InLoginModels>, res: ResponseBody<AccessToken>) => {

    const loginUser = await authService.loginUser(req.body);

    if (loginUser.status !== ResultSuccess.Success || loginUser.extensions) {
        console.log(`[loginUser] не прошел авторизацию`);
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    //TODO: Вернуть на место!
    const {jwt, refresh} = loginUser.data
    const decodedAccessToken = await jwtService.decodeToken(jwt);
    const decodedRefreshToken = await jwtService.decodeToken(refresh);
    console.log('декодированные данные: ' + JSON.stringify({access: decodedAccessToken, refresh: decodedRefreshToken}));
    console.log('пришедшие данные, перед записью в куку: ' + JSON.stringify(loginUser.data))

    res.cookie('refreshToken', loginUser.data.refresh, {httpOnly: true, secure: true});
    res.status(HTTP_STATUSES.OK_200).send({accessToken: loginUser.data.jwt});
    return;
}