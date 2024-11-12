import {Router} from "express";
import {loginController} from "../../controllers/auth/login.controller";
import {codeValidator, emailValidator, loginPostValidator, registrationPostValidator} from "../../validators/auth.validator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/check.errors.middleware";
import {authBearerMiddlewares} from "../../utils/middlewares/auth.bearer.middleware";
import {getInfoUserController} from "../../controllers/auth/get.info.user.controller";
import {registrationConfirmationController} from "../../controllers/auth/registration.conf.controller";
import {registrationController} from "../../controllers/auth/registration.controller";
import {registrationEmailController} from "../../controllers/auth/registration.email.controller";
import {verifyTokenInCookieMiddleware} from "../../utils/middlewares/verify.token.in.cookie.middleware";
import {refreshTokenController} from "../../controllers/auth/refresh.token.controller";
import {logoutController} from "../../controllers/auth/logout.controller";
import {
    emailLimiter,
    loginLimiter,
    registrationLimiter
} from "../../utils/middlewares/limiter.middleware";

export const authRouter: Router = Router();

authRouter.post('/login', loginLimiter, [...loginPostValidator, inputCheckErrorsMiddleware], loginController);
authRouter.post('/refresh-token', verifyTokenInCookieMiddleware, refreshTokenController)
authRouter.post('/logout', verifyTokenInCookieMiddleware, logoutController)

authRouter.post('/registration-confirmation', registrationLimiter, codeValidator, inputCheckErrorsMiddleware, registrationConfirmationController);
authRouter.post('/registration', registrationLimiter, [...registrationPostValidator, inputCheckErrorsMiddleware], registrationController);
authRouter.post('/registration-email-resending', emailLimiter, emailValidator, inputCheckErrorsMiddleware, registrationEmailController);

authRouter.get('/me', authBearerMiddlewares, getInfoUserController);
