// ...

import { BlogViewModel } from "../models/BlogViewModel";
import { PostViewModel } from "../models/PostViewModel";
import { SETTINGS } from "../settings";
import { Collection, MongoClient } from "mongodb"; // Import the MongoClient class from the "mongodb" module

 
// получение доступа к бд

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db = client.db(SETTINGS.DB_NAME);
 
// получение доступа к коллекциям
export const blogsCollection: Collection<BlogViewModel> = db.collection<BlogViewModel>(SETTINGS.BLOG_COLLECTION_NAME)
export const postsCollection: Collection<PostViewModel> = db.collection<PostViewModel>(SETTINGS.POST_COLLECTION_NAME)
 
// проверка подключения к бд
export const runDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
    } catch (e) {
        console.log(e)
        await client.close()
    }
}