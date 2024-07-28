import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {AllUsersController} from "../../controllers/users/GetAllUsers";
import {userCreateValidator} from "../../validators/userValidator";
import {createUserController} from "../../controllers/users/CreateUser";
import {deleteUserController} from "../../controllers/users/DeleteUserToId";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const userRouter: Router = Router();

userRouter.get('/', adminMiddlewares, AllUsersController);
userRouter.post('/', adminMiddlewares, [...userCreateValidator, inputCheckErrorsMiddleware], createUserController);
userRouter.delete('/:id', adminMiddlewares, deleteUserController);