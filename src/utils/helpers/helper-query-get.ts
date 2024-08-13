import {QueryPostInputModels} from "../../models/post/input/get-query.post.input.models";
import {InQueryBlogModel} from "../../models/blog/input/input-type-blogs";
import {QueryHelperResponse} from "../../models/blog/helper-query-blog/helper-blog";

export const queryHelperToBlog = (query: InQueryBlogModel): QueryHelperResponse => {
    return {
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        searchNameTerm: query.searchNameTerm ?? null,
    }
}

export const queryHelperToPost = (query: QueryPostInputModels) => {
    return {
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
    }
}

export const queryHelperToUser = (query: any) => {
    return {
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        searchLoginTerm: query.searchLoginTerm ?? null,
        searchEmailTerm: query.searchEmailTerm ?? null,
    }
}