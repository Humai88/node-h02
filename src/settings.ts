import dotenv from 'dotenv'
dotenv.config()
 
 
export const SETTINGS = {
    ADMIN: 'admin:qwerty',
    MONGO_URL: process.env.MONGO_URL || '',
    DB_NAME: process.env.DB_NAME || 'blog',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || 'blogs',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || 'posts',
    USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || 'users',
    BLACKLIST_COLLECTION_NAME: process.env.BLACKLIST_COLLECTION_NAME || 'blacklist',
    COMMENT_COLLECTION_NAME: process.env.COMMENT_COLLECTION_NAME || 'comments',
    PORT: process.env.PORT || 3003,
    JWT_SECRET: process.env.JWT_SECRET || '256',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '256',
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        TEST: '/testing/all-data'
    },
}