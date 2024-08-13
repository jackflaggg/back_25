import {SortDirection} from "mongodb";
import {queryParamsName} from "../input/input-type-blogs";

export interface QueryHelperResponse {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: queryParamsName | null
}