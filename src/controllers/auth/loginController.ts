import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common/common-types";
import {loginControllerModels} from "../../models/auth/input/login-post-controller";
import {jwtService} from "../../utils/application/jwt-service";
import {authService} from "../../domain/auth/auth-service";

export const loginController = async (req: RequestWithBody<loginControllerModels>, res: ResponseBody<{ accessToken: string}>) => {

    const credentialLoginOrEmail = await authService.authenticationUser(req.body);

    if (!credentialLoginOrEmail) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return
    }

    const jwtToken = await jwtService.createToken(credentialLoginOrEmail._id);

    if (!jwtToken){
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION);
        return;
    }

    return res.status(HTTP_STATUSES.OK_200).send({accessToken: jwtToken})

}