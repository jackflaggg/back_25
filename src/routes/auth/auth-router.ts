import {Router} from "express";
import {loginController} from "../../controllers/auth/loginController";

export const authRouter: Router = Router();


authRouter.post('/login', loginController);
