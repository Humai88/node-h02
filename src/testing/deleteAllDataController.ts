import { Request, Response } from 'express'
import { db } from '../db/db'

export const deleteAllDataController = (req: Request, res: Response) => {
    db.posts = []
    db.blogs = []
    res
        .sendStatus(204)
}
