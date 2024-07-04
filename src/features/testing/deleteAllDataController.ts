import { Request, Response } from 'express'
import { setDB } from '../../db/db'
import { blogsCollection, postsCollection } from '../../db/mongo-db';

export const deleteAllDataController = async (req: Request, res: Response): Promise<void> => {
  try {
       await blogsCollection.deleteMany({});
       await postsCollection.deleteMany({});

      } catch (error) {
        console.error('Error deleting blog data:', error);
      }
    res
        .sendStatus(204)
}
