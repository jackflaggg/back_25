import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3001,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        TESTING: '/testing',
        VERCEL: '/'
    },
    DB_NAME: 'hometask',
    COLLECTION_POSTS: process.env.POST_COLLECTION_NAME || 'posts',
    COLLECTION_BLOGS: process.env.BLOG_COLLECTION_NAME || 'blogs',
    COLLECTION_USERS: process.env.COLLECTION_USERS || 'users',
    COLLECTION_COMMENTS: process.env.COMMENTS_COLLECTION_NAME || 'comments',
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    SECRET_KEY: process.env.SECRET_KEY || '',
    TOKEN_DURATION: process.env.TOKEN_DURATION || '',
    EMAIL_NAME: process.env.EMAIL_USER_ACCOUNT || '',
    PASS: process.env.PASS_USER_ACCOUNT || '',
    HOST: process.env.HOST || '',
    NAME_SUBJECT: process.env.NAME_SUBJECT || '',
}