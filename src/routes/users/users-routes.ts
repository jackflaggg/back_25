import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {AllUsersController} from "../../controllers/users/GetAllUsers";
import {userCreateValidator} from "../../validators/userValidator";
import {createUserController} from "../../controllers/users/CreateUser";
import {deleteUserController} from "../../controllers/users/DeleteUserToId";

export const usersRoutes: Router = Router();

usersRoutes.get('/', adminMiddlewares, AllUsersController);
usersRoutes.post('/', adminMiddlewares, ...userCreateValidator, createUserController);
usersRoutes.delete('/:id', adminMiddlewares, deleteUserController);