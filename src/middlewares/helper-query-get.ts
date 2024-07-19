import {QueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";
import {QueryPostInputModels} from "../models/post/input/get-query.post.input.models";

export const helperToBlog = (query: QueryBlogInputModels) => {
    return {
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        searchNameTerm: query.searchNameTerm ?? null,
    }
}

export const helperToPost = (query: QueryPostInputModels) => {
    return {
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
    }
}

export const helperToUser = (query: any) => {
    return {
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        searchLoginTerm: query.searchLoginTerm ?? null,
        searchEmailTerm: query.searchEmailTerm ?? null,
    }
}