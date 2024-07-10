import {QueryBlogInputModels} from "../models/blog/input/get-query.blog.input.models";
import {query} from "express";

export const defaultQueryParameters: QueryBlogInputModels = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    searchNameTerm: null
}
export const helper = (query: QueryBlogInputModels) => {
    return {
        pageNumber: query.pageNumber ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        searchNameTerm: query.searchNameTerm ?? null,
    }
}