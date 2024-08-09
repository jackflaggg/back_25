import {Router} from "express";
import {loginController} from "../../controllers/auth/loginController";
import {loginPostValidator} from "../../validators/authValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const authRouter: Router = Router();


authRouter.post('/login', [...loginPostValidator, inputCheckErrorsMiddleware], loginController);
