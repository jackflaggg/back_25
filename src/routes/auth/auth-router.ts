import {Router} from "express";
import {loginController} from "../../controllers/auth/loginController";
import {codeValidator, emailValidator, loginPostValidator, registrationPostValidator} from "../../validators/authValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";
import {authBearerMiddlewares} from "../../utils/middlewares/auth-bearer-middleware";
import {getInfoUserController} from "../../controllers/auth/getInfoUserController";
import {registrationConfirmationController} from "../../controllers/auth/registrConfirmationController";
import {registrationController} from "../../controllers/auth/registrationController";
import {registrationEmailController} from "../../controllers/auth/registrationEmailController";


export const authRouter: Router = Router();


authRouter.post('/login', [...loginPostValidator, inputCheckErrorsMiddleware], loginController);
authRouter.post('/registration-confirmation', codeValidator, inputCheckErrorsMiddleware, registrationConfirmationController);
authRouter.post('/registration', [...registrationPostValidator, inputCheckErrorsMiddleware], registrationController);
authRouter.post('/registration-email-resending', emailValidator, inputCheckErrorsMiddleware, registrationEmailController);

authRouter.get('/me', authBearerMiddlewares, getInfoUserController);
