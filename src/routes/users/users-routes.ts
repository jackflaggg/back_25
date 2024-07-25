import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {AllUsersController} from "../../controllers/users/GetAllUsers";
import {userCreateValidator} from "../../validators/userValidator";
import {createUserController} from "../../controllers/users/CreateUser";
import {deleteUserController} from "../../controllers/users/DeleteUserToId";

export const userRouter: Router = Router();

userRouter.get('/', adminMiddlewares, AllUsersController);
userRouter.post('/', adminMiddlewares, ...userCreateValidator, createUserController);
userRouter.delete('/:id', adminMiddlewares, deleteUserController);