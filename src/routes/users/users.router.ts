import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin.middleware";
import {AllUsersController} from "../../controllers/users/get.all.users";
import {userCreateValidator} from "../../validators/user.validator";
import {createUserController} from "../../controllers/users/create.user";
import {deleteUserController} from "../../controllers/users/delete.user";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/check.errors.middleware";

export const userRouter: Router = Router();

userRouter.get('/', adminMiddlewares, AllUsersController);
userRouter.post('/', adminMiddlewares, [...userCreateValidator, inputCheckErrorsMiddleware], createUserController);
userRouter.delete('/:id', adminMiddlewares, deleteUserController);