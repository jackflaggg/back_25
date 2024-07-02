import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3001,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
    },
    DB_NAME: 'ClusterSprint3',
    COLLECTION_POSTS: process.env.POST_COLLECTION_NAME || '',
    COLLECTION_BLOGS: process.env.BLOG_COLLECTION_NAME || '',
    ADMIN: process.env.ADMIN || 'admin:qwerty',
}