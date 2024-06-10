export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_AUTHORIZATION = 401,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type BlogDbType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    blogs: BlogDbType[]
    posts: PostDbType[]
}

