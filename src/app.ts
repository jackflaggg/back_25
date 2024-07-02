import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./controllers/blogs/index-blog";
import {testingRouter} from "./controllers/testing";
import {postRouter} from "./controllers/posts/index-post";

export const app = express();
app.use(express.json())
app.use(cors())

app.use(SETTINGS.PATH.TESTING, testingRouter);

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
