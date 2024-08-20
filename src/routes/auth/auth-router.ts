import {Router} from "express";
import {loginController} from "../../controllers/auth/loginController";
import {
    codeValidator,
    emailValidator,
    loginPostValidator,
    registrationPostValidator
} from "../../validators/authValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";
import {authBearerMiddlewares} from "../../utils/middlewares/auth-bearer-middleware";
import {getInfoUserController} from "../../controllers/auth/getInfoUserController";


export const authRouter: Router = Router();


authRouter.post('/login', [...loginPostValidator, inputCheckErrorsMiddleware], loginController);
authRouter.post('/registration-confirmation', codeValidator, inputCheckErrorsMiddleware, );
authRouter.post('/registration', [...registrationPostValidator, inputCheckErrorsMiddleware], );
authRouter.post('/registration-email', emailValidator, inputCheckErrorsMiddleware, );

authRouter.get('/me', authBearerMiddlewares, getInfoUserController);
