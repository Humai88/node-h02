import { blogsCollection, postsCollection } from "../db/mongo-db"
import { BlogInputModel, PostInBlogInputModel } from "../models/BlogInputModel"
import {  ObjectId } from "mongodb";
import { BlogDBViewModel, PostDBViewModel } from "../models/DBModel";

export const usersDBRepository = {

  async createUser(blog: BlogDBViewModel): Promise<BlogDBViewModel> {
    const newBlog = await blogsCollection.insertOne(blog)
    const insertedBlog = await blogsCollection.findOne({ _id: newBlog.insertedId });
  
    if (!insertedBlog) {
      throw new Error('Failed to retrieve inserted blog');
    }
    return insertedBlog
  },


  async deleteUser(id: string): Promise<boolean> {
    const objectBlogId = new ObjectId(id);
    const result = await blogsCollection.deleteOne({ _id: objectBlogId });
    return result.deletedCount === 1
  },

}

