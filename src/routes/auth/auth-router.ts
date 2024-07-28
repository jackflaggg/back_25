import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {createUserController} from "../../controllers/users/CreateUser";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";
import {authCreateValidator} from "../../validators/authValidator";

export const authRouter: Router = Router();


authRouter.post('/login', adminMiddlewares, [...authCreateValidator, inputCheckErrorsMiddleware], createUserController);
