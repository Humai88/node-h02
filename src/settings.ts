import dotenv from 'dotenv'
dotenv.config()
 
 
export const SETTINGS = {
    ADMIN: 'admin:qwerty',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || 'blog',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || 'blogs',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || 'posts',
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TEST: '/testing/all-data'
    },
}