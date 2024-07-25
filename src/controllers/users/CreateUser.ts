import {HTTP_STATUSES, RequestWithBody, ResponseBody} from "../../models/common-types";
import {InputCreateBlogModel} from "../../models/blog/input/create.blog.input.models";
import {OutputBlogModel} from "../../models/blog/output/blog.output.models";
import {blogsService} from "../../domain/blog/blog-service";
import {blogsQueryRepositories} from "../../repositories/blogs/blogs-query-repository";
import {userService} from "../../domain/user/user-service";
import {usersQueryRepository} from "../../repositories/users/users-query-repository";

export const createUserController = async (req: RequestWithBody<any>,
                                           res:ResponseBody<any>) => {
    const createdUserId = await userService.createUser(req.body);

    const user = await usersQueryRepository.getUserById(createdUserId!.id)

    if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.CREATED_201).send(user);
}