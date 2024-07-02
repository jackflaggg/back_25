import {Router} from "express";
import {adminMiddlewares} from "../../middlewares/admin-middleware";
import {createPostController} from "./CreatePost";
import {AllPostController} from "./getAllPosts";
import {OnePostController} from "./getOnePost";
import {updatePostController} from "./UpdatePost";
import {deletePostController} from "./DelPost";
import {blogIdValidator, postValidator} from "../../validators/postValidator";
import {inputCheckErrorsMiddleware} from "../../middlewares/checkErrorsValidator";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", blogIdValidator, OnePostController);
postRouter.post("/", adminMiddlewares, inputCheckErrorsMiddleware, ...postValidator,createPostController);
postRouter.put("/:id", adminMiddlewares, ...postValidator, updatePostController);
postRouter.delete("/:id", adminMiddlewares, blogIdValidator, deletePostController);
