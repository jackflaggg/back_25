import {Router} from "express";
import {AllBlogController} from "./getAllBlogs";
import {OneBlogController} from "./getOneBlog";
import {createBlogController} from "./CreateBlog";
import {updateBlogController} from "./UpdateBlog";
import {deleteBlogController} from "./DelBlogId";
import {adminMiddlewares} from "../../middlewares/admin-middleware";
import {blogValidator} from "../../validators/blogValidator";
import {inputCheckErrorsMiddleware} from "../../middlewares/checkErrorsValidator";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", OneBlogController);
blogsRouter.post("/", adminMiddlewares, inputCheckErrorsMiddleware, ...blogValidator, createBlogController);
blogsRouter.put("/:id", adminMiddlewares, ...blogValidator, updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, deleteBlogController);
