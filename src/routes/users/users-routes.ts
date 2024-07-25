import {Router} from "express";
import {postRouter} from "../posts/posts-router";
import {adminMiddlewares} from "../../middlewares/admin-middleware";
import {AllUsersController} from "../../controllers/users/GetAllUsers";

export const usersRoutes: Router = Router();

usersRoutes.get('/', adminMiddlewares, AllUsersController)