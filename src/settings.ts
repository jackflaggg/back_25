import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3001,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
    },
    DB_NAME: 'hometask',
    COLLECTION_POSTS: process.env.POST_COLLECTION_NAME || '',
    COLLECTION_BLOGS: process.env.BLOG_COLLECTION_NAME || 'blogs',
    ADMIN: process.env.ADMIN || 'admin:qwerty',
}