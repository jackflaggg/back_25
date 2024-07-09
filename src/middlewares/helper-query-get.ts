import {GetQueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";

export const helper = (query: GetQueryBlogInputModels) => {
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
        pageSize: query.pageSize !== undefined ? Number(query.pageSize) : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}