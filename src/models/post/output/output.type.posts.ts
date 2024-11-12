export type OutPostModel = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export interface OutGetAllPosts {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: OutPostModel[],
}