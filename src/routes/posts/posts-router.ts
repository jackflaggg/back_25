import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin-middleware";
import {createPostController} from "../../controllers/posts/CreatePost";
import {AllPostController} from "../../controllers/posts/getAllPosts";
import {OnePostController} from "../../controllers/posts/getOnePost";
import {updatePostController} from "../../controllers/posts/UpdatePost";
import {deletePostController} from "../../controllers/posts/DelPost";
import {blogIdValidator, createCommentValidator, postValidator} from "../../validators/postValidator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/checkErrorsValidator";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", blogIdValidator, OnePostController);


postRouter.post("/", adminMiddlewares, [...postValidator, inputCheckErrorsMiddleware],createPostController);
postRouter.post(':/postId', adminMiddlewares, createCommentValidator, inputCheckErrorsMiddleware)

postRouter.put("/:id", adminMiddlewares, [...postValidator, inputCheckErrorsMiddleware], updatePostController);
postRouter.delete("/:id", adminMiddlewares, blogIdValidator, deletePostController);
