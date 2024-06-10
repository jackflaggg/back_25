import {Router} from "express";
import {adminMiddlewares} from "../global-middlewares/admin-middleware";
import {createPostController} from "./controllers/CreatePost";
import {AllPostController} from "./controllers/getAllPosts";
import {OnePostController} from "./controllers/getOnePost";
import {updatePostController} from "./controllers/UpdatePost";
import {deletePostController} from "./controllers/DelPost";
import {blogIdValidator, findPostValidator, postValidator} from "./middlewares/postValidator";
import {inputCheckErrorsMiddleware} from "../global-middlewares/checkErrorsValidator";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", findPostValidator, blogIdValidator, OnePostController);
postRouter.post("/", inputCheckErrorsMiddleware, ...postValidator,createPostController);
postRouter.put("/:id", findPostValidator, ...postValidator, updatePostController);
postRouter.delete("/:id", adminMiddlewares, findPostValidator, blogIdValidator, deletePostController);
