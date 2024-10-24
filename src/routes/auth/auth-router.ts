import {Router} from "express";
import {loginController} from "../../controllers/auth/loginController";
import {codeValidator, emailValidator, loginPostValidator, registrationPostValidator} from "../../validators/authValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";
import {authBearerMiddlewares} from "../../utils/middlewares/auth-bearer-middleware";
import {getInfoUserController} from "../../controllers/auth/getInfoUserController";
import {registrationConfirmationController} from "../../controllers/auth/registrConfirmationController";
import {registrationController} from "../../controllers/auth/registrationController";
import {registrationEmailController} from "../../controllers/auth/registrationEmailController";
import {verifyTokenInCookie} from "../../utils/middlewares/verifyTokenInCookie";
import {refreshTokenController} from "../../controllers/auth/refreshTokenController";
import {logoutController} from "../../controllers/auth/logoutController";
import {emailLimiter, loginLimiter, registrationLimiter} from "../../utils/middlewares/registration-limiter";


export const authRouter: Router = Router();
//TODO: Куда запихнуть лимитеры
authRouter.post('/login', loginLimiter, [...loginPostValidator, inputCheckErrorsMiddleware], loginController);
authRouter.post('/refresh-token', verifyTokenInCookie, refreshTokenController)
authRouter.post('/logout', verifyTokenInCookie, logoutController)

authRouter.post('/registration-confirmation', registrationLimiter, codeValidator, inputCheckErrorsMiddleware, registrationConfirmationController);
authRouter.post('/registration', registrationLimiter, [...registrationPostValidator, inputCheckErrorsMiddleware], registrationController);
authRouter.post('/registration-email-resending', emailLimiter, emailValidator, inputCheckErrorsMiddleware, registrationEmailController);

authRouter.get('/me', authBearerMiddlewares, getInfoUserController);
