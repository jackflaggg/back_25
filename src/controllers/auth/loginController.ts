import {
    AccessToken,
    HTTP_STATUSES,
    RequestWithBody,
    ResponseBody,
    ResultSuccess
} from "../../models/common/common-types";
import {InLoginModels} from "../../models/auth/input/login-post-controller";
import {authService} from "../../domain/auth/auth-service";

export const loginController = async (req: RequestWithBody<InLoginModels>, res: ResponseBody<AccessToken>) => {

    const loginUser = await authService.loginUser(req.body);

    if (loginUser.status !== ResultSuccess.Success || loginUser.extensions) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        return;
    }

    res.cookie('refreshToken', loginUser.data[1], {httpOnly: true, secure: true});
    res.status(HTTP_STATUSES.OK_200).send({accessToken: loginUser.data[0]});
    return;
}