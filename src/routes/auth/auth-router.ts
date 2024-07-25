import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {userCreateValidator} from "../../validators/userValidator";
import {createUserController} from "../../controllers/users/CreateUser";

export const authRouter: Router = Router();


authRouter.post('/login', adminMiddlewares, ...userCreateValidator, createUserController);
