import {SortDirection} from "mongodb";

export type QueryPostInputModels = {
    sortBy?: string,
    sortDirection?: SortDirection,
    pageNumber?: number,
    pageSize?: number,
}