import {SortDirection} from "mongodb";

export type QueryBlogInputModels = {
    searchNameTerm?: string | null,
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
}