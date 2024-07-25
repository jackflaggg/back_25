import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {createPostController} from "../../controllers/posts/CreatePost";
import {AllPostController} from "../../controllers/posts/getAllPosts";
import {OnePostController} from "../../controllers/posts/getOnePost";
import {updatePostController} from "../../controllers/posts/UpdatePost";
import {deletePostController} from "../../controllers/posts/DelPost";
import {blogIdValidator, postValidator} from "../../validators/postValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", blogIdValidator, OnePostController);

postRouter.post("/", adminMiddlewares, inputCheckErrorsMiddleware, ...postValidator,createPostController);
postRouter.put("/:id", adminMiddlewares, ...postValidator, updatePostController);
postRouter.delete("/:id", adminMiddlewares, blogIdValidator, deletePostController);
