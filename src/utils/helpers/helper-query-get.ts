import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import {InQueryBlogModel} from "../../models/blog/input/input-type-blogs";
import {QueryHelperResponse} from "../../models/blog/helper-query-blog/helper-blog";

export const queryHelperToBlog = (queryBlog: InQueryBlogModel): QueryHelperResponse => {
    return {
        pageNumber: queryBlog.pageNumber ?? 1,
        pageSize: queryBlog.pageSize ?? 10,
        sortBy: queryBlog.sortBy ?? 'createdAt',
        sortDirection: queryBlog.sortDirection ?? 'desc',
        searchNameTerm: queryBlog.searchNameTerm ?? null,
    }
}

export const queryHelperToPost = (queryPost: QueryPostInputModels) => {
    return {
        pageNumber: queryPost.pageNumber ?? 1,
        pageSize: queryPost.pageSize ?? 10,
        sortBy: queryPost.sortBy ?? 'createdAt',
        sortDirection: queryPost.sortDirection ?? 'desc',
    }
}

export const queryHelperToUser = (queryUser: any) => {
    return {
        sortBy: queryUser.sortBy ?? 'createdAt',
        sortDirection: queryUser.sortDirection ?? 'desc',
        pageNumber: queryUser.pageNumber ?? 1,
        pageSize: queryUser.pageSize ?? 10,
        searchLoginTerm: queryUser.searchLoginTerm ?? null,
        searchEmailTerm: queryUser.searchEmailTerm ?? null,
    }
}