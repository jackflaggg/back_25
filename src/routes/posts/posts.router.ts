import {Router} from "express";
import {adminMiddlewares} from "../../utils/middlewares/admin.middleware";
import {createPostController} from "../../controllers/posts/create.post";
import {AllPostController} from "../../controllers/posts/get.all.posts";
import {OnePostController} from "../../controllers/posts/get.one.post";
import {updatePostController} from "../../controllers/posts/update.post";
import {deletePostController} from "../../controllers/posts/del.post";
import {blogIdValidator, postValidator} from "../../validators/post.validator";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/check.errors.middleware";
import {authBearerMiddlewares} from "../../utils/middlewares/auth.bearer.middleware";
import {contentValidator} from "../../validators/comment.validator";
import {createCommentByPostIdController} from "../../controllers/posts/create.comments.to.post";
import {getCommentsToPostId} from "../../controllers/posts/get.all.comments.to.post";

export const postRouter: Router = Router();

postRouter.get("/", AllPostController);
postRouter.get("/:id", blogIdValidator, OnePostController);
postRouter.get('/:postId/comments', getCommentsToPostId);

postRouter.post("/", adminMiddlewares, [...postValidator, inputCheckErrorsMiddleware], createPostController);
postRouter.post('/:postId/comments', authBearerMiddlewares, contentValidator, inputCheckErrorsMiddleware, createCommentByPostIdController);

postRouter.put("/:id", adminMiddlewares, [...postValidator, inputCheckErrorsMiddleware], updatePostController);
postRouter.delete("/:id", adminMiddlewares, blogIdValidator, deletePostController);
