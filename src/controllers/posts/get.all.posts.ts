import {HTTP_STATUSES} from "../../models/common/common.types";
import {queryHelperToPost} from "../../utils/helpers/helper.query.get";
import {postsQueryRepository} from "../../repositories/posts/posts.query.repository";
import {InQueryPostModel} from "../../models/post/input/input.type.posts";
import {OutGetAllPosts} from "../../models/post/output/output.type.posts";
import {RequestWithQuery, ResponseBody} from "../../models/common/req_res_params/request.response.params";

export const AllPostController = async (req: RequestWithQuery<InQueryPostModel>,
                                        res:ResponseBody<OutGetAllPosts>) => {
    const queryPost = queryHelperToPost(req.query);
    const getAllPosts = await postsQueryRepository.getAllPost(queryPost)

    res.status(HTTP_STATUSES.OK_200).send(getAllPosts);
    return;
}