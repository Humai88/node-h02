import { Request, Response } from 'express'
import { blogsCollection, commentsCollection, postsCollection, usersCollection } from '../../db/mongo-db';

export const deleteAllDataController = async (req: Request, res: Response): Promise<any> => {
  try {
    await blogsCollection.deleteMany({});
    await postsCollection.deleteMany({});
    await usersCollection.deleteMany({});
    await commentsCollection.deleteMany({});
    return res
      .sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      errorsMessages: [{ message: 'Internal server error', field: 'server' }]
    });
  }

}
