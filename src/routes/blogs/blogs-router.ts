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
import {postValidator} from "../../validators/postValidator";
import {createNewPostToBlogID} from "../../controllers/blogs/CreateNewPostToBlogID";

export const blogsRouter: Router = Router();

blogsRouter.get("/", AllBlogController);
blogsRouter.get("/:id", OneBlogController);
blogsRouter.get("/:id/posts", getAllPostsToBlogID);
blogsRouter.post("/", adminMiddlewares, ...blogValidator, createBlogController);
blogsRouter.post("/:id/posts", adminMiddlewares, ...postValidator, );
blogsRouter.put("/:id", adminMiddlewares, ...blogValidator, createNewPostToBlogID);
blogsRouter.delete("/:id", adminMiddlewares, deleteBlogController);
