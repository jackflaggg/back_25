// инициализация типов при создании данных (блогов, постов, бд)

export type BlogDbType = {
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}

export type PostDbType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type BlogCreateType = {
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}

export type PostCreateType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type PostUpdateType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
}