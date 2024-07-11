import {Router} from "express";
import {AllBlogController} from "../../controllers/blogs/GetAllBlogs";
import {OneBlogController} from "../../controllers/blogs/GetOneBlog";
import {createBlogController} from "../../controllers/blogs/CreateBlog";
import {updateBlogController} from "../../controllers/blogs/UpdateBlog";
import {deleteBlogController} from "../../controllers/blogs/DelBlogId";
import {adminMiddlewares} from "../../middlewares/admin-middleware";
import {blogValidator} from "../../validators/blogValidator";
import {inputCheckErrorsMiddleware} from "../../middlewares/checkErrorsValidator";
import {getAllPostsToBlogID} from "../../controllers/blogs/GetAllPostsToBlogID";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", OneBlogController);
blogsRouter.get("/:id/posts", getAllPostsToBlogID);
blogsRouter.post("/", adminMiddlewares, inputCheckErrorsMiddleware, ...blogValidator, createBlogController);
blogsRouter.put("/:id", adminMiddlewares, ...blogValidator, updateBlogController);
blogsRouter.delete("/:id", adminMiddlewares, deleteBlogController);
