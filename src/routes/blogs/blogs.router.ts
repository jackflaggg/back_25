import {Router} from "express";
import {AllBlogController} from "../../controllers/blogs/get.all.blogs";
import {OneBlogController} from "../../controllers/blogs/get.one.blog";
import {createBlogController} from "../../controllers/blogs/create.blog";
import {updateBlogController} from "../../controllers/blogs/update.blog";
import {deleteBlogController} from "../../controllers/blogs/del.blog";
import {adminMiddlewares} from "../../utils/middlewares/admin.middleware";
import {blogValidator} from "../../validators/blog.validator";
import {getAllPostsToBlog} from "../../controllers/blogs/get.all.posts.to.blog";
import {blogIdParamsValidator, postCreateWithBlogIdValidator} from "../../validators/post.validator";
import {createNewPostToBlog} from "../../controllers/blogs/create.new.post.to.blog";
import {inputCheckErrorsMiddleware} from "../../utils/middlewares/check.errors.middleware";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", blogIdParamsValidator, inputCheckErrorsMiddleware, OneBlogController);
blogsRouter.get("/:id/posts", getAllPostsToBlog);

blogsRouter.post("/", adminMiddlewares, [...blogValidator, inputCheckErrorsMiddleware], createBlogController);
blogsRouter.post("/:id/posts", adminMiddlewares, [...postCreateWithBlogIdValidator, inputCheckErrorsMiddleware], createNewPostToBlog);

blogsRouter.put("/:id", adminMiddlewares, blogIdParamsValidator, [...blogValidator, inputCheckErrorsMiddleware], updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, blogIdParamsValidator, deleteBlogController);
