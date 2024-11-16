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
        SECURITY_DEVICES: '/security',
        VERCEL: '/'
    },
    DB_NAME: 'back',
    COLLECTION_POSTS: process.env.POST_COLLECTION_NAME || 'posts',
    COLLECTION_BLOGS: process.env.BLOG_COLLECTION_NAME || 'blogs',
    COLLECTION_USERS: process.env.COLLECTION_USERS || 'users',
    COLLECTION_COMMENTS: process.env.COMMENTS_COLLECTION_NAME || 'comments',
    COLLECTION_TOKEN: process.env.REFRESH_TOKEN || 'refresh_token',
    COLLECTION_API: process.env.COLLECTION_API || 'security_devices',
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    SECRET_KEY: process.env.SECRET_KEY || '',
    TOKEN_DURATION: process.env.TOKEN_DURATION || '',
    EMAIL_NAME: process.env.EMAIL_USER_ACCOUNT || 'rasul.khamzin@mail.ru',
    PASS: process.env.PASS_USER_ACCOUNT || 'vFY0msku84DP2JbQXQ7h',
    HOST: process.env.HOST || '',
    NAME_SUBJECT: process.env.NAME_SUBJECT || '',
    EXPIRES_IN_ACCESS_TOKEN: process.env.EXPIRES_IN_ACCESS_TOKEN || '10s',
    EXPIRES_IN_REFRESH_TOKEN: process.env.EXPIRES_IN_REFRESH_TOKEN || '20s',
    userAgent: process.env.USER_AGENT,
    ipTest: process.env.IP_TEST,

    DB_URI_TEST: process.env.DB_URI_TEST || 'mongodb://localhost:27017/testunit',
}