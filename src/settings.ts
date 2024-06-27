import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
 
export const SETTINGS = {
    ADMIN: 'admin:qwerty',
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TEST: '/testing/all-data'
    },
}