import {Router} from "express";
import {AllBlogController} from "./controllers/getAllBlogs";
import {OneBlogController} from "./controllers/getOneBlog";
import {createBlogController} from "./controllers/CreateBlog";
import {updateBlogController} from "./controllers/UpdateBlog";
import {deleteBlogController} from "./controllers/DelBlogId";
import {adminMiddlewares} from "../global-middlewares/admin-middleware";
import {blogValidator, findBlogValidator} from "./middlewares/blogValidator";
import {inputCheckErrorsMiddleware} from "../global-middlewares/checkErrorsValidator";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", findBlogValidator, OneBlogController);
blogsRouter.post("/", adminMiddlewares, inputCheckErrorsMiddleware, ...blogValidator, createBlogController);
blogsRouter.put("/:id", adminMiddlewares, findBlogValidator, ...blogValidator, updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, findBlogValidator, deleteBlogController);
