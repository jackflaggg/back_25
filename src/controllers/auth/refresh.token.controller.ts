import {HTTP_STATUSES} from "../../models/common/common.types";
import {Request, Response} from "express";
import {jwtService} from "../../utils/application/jwt.service";
import {ErrorAuth} from "../../models/auth/ouput/auth.service.models";

export const refreshTokenController = async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;

    const updateTokens = await jwtService.updateRefreshToken(refreshToken);
    if (updateTokens instanceof ErrorAuth || !updateTokens){
        console.log('[updateToken] ошибка при обновлении токена!')
        res
            .sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401)
        return;
    }
    res.cookie('refreshToken', updateTokens.data[1], {httpOnly: true, secure: true});

    res.status(HTTP_STATUSES.OK_200).send({accessToken: updateTokens.data[0]});
    return;
}