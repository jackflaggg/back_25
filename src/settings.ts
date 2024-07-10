import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3077,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
        VERCEL: '/'
    },
    DB_NAME: 'hometask',
    COLLECTION_POSTS: process.env.POST_COLLECTION_NAME || 'posts',
    COLLECTION_BLOGS: process.env.BLOG_COLLECTION_NAME || 'blogs',
    ADMIN: process.env.ADMIN || 'admin:qwerty',
}