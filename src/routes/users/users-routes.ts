import {Router} from "express";
import {postRouter} from "../posts/posts-router";

export const usersRoutes: Router = Router();

postRouter.use("/users", usersRoutes);