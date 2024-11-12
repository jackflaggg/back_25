import {InQueryBlogModel} from "../../models/blog/input/input.type.blogs";
import {QueryHelperBlog} from "../../models/blog/helper-query-blog/helper.blog";
import {InQueryPostModel} from "../../models/post/input/input.type.posts";
import {QueryHelperPost} from "../../models/post/helper-query-post/helper.post";
import {InQueryUserModel} from "../../models/user/helper-query-user/helper.user";

export const queryHelperToBlog = (queryBlog: InQueryBlogModel): QueryHelperBlog => ({
        pageNumber: queryBlog.pageNumber ?? 1,
        pageSize: queryBlog.pageSize ?? 10,
        sortBy: queryBlog.sortBy ?? 'createdAt',
        sortDirection: queryBlog.sortDirection ?? 'desc',
        searchNameTerm: queryBlog.searchNameTerm ?? null,
});

export const queryHelperToPost = (queryPost: InQueryPostModel): QueryHelperPost => ({
        pageNumber: queryPost.pageNumber ?? 1,
        pageSize: queryPost.pageSize ?? 10,
        sortBy: queryPost.sortBy ?? 'createdAt',
        sortDirection: queryPost.sortDirection ?? 'desc',
});

export const queryHelperToUser = (queryUser: InQueryUserModel) => ({
        sortBy: queryUser.sortBy ?? 'createdAt',
        sortDirection: queryUser.sortDirection ?? 'desc',
        pageNumber: queryUser.pageNumber ?? 1,
        pageSize: queryUser.pageSize ?? 10,
        searchLoginTerm: queryUser.searchLoginTerm ?? null,
        searchEmailTerm: queryUser.searchEmailTerm ?? null,
});