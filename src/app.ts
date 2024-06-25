import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings'
import { testRouter } from './routers/testingRouter'
import { postsRouter } from './routers/postsRouter'
import { blogsRouter } from './routers/blogsRouter'
 
export const app = express()
app.use(express.json())
app.use(cors())
 
app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TEST, testRouter)