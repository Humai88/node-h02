import { blogsCollection } from "../db/mongo-db"
import { BlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"
import { v4 } from 'uuid';
import { ObjectId, WithId } from "mongodb";

export const BlogsDBRepository = {
  async getBlogs(): Promise<BlogViewModel[]> {
    const blogsMongoDbResult = await blogsCollection.find({}).toArray();
    return blogsMongoDbResult.map((blog: WithId<BlogViewModel>) => this.mapResult(blog));
  },

  async findBlog(id: string): Promise<BlogViewModel | null> {
    const blog: WithId<BlogViewModel> | null = await blogsCollection.findOne({ id: id })
    if (!blog) {
      return null
    } else {
      return this.mapResult(blog)
    }
  },

  async createBlog(blog: BlogInputModel): Promise<BlogViewModel> {
    const newBlog: WithId<BlogViewModel> = {
      ...blog,
      isMembership: false,
      createdAt: new Date().toISOString(),
      id: v4(),
      _id: new ObjectId(),
    }
    await blogsCollection.insertOne(newBlog)
    return this.mapResult(newBlog)
  },

  async updateBlog(id: string, blog: BlogInputModel): Promise<boolean> {
    const result = await blogsCollection.updateOne({ id: id }, { $set: { name: blog.name, websiteUrl: blog.websiteUrl, description: blog.description } })
    return result.matchedCount === 1
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },

  mapResult(mongoDbBlogResult: WithId<BlogViewModel>): BlogViewModel {
    const blogForOutput: BlogViewModel = {
      id: mongoDbBlogResult.id,
      name: mongoDbBlogResult.name,
      description: mongoDbBlogResult.description,
      websiteUrl: mongoDbBlogResult.websiteUrl,
      createdAt: mongoDbBlogResult.createdAt,
      isMembership: mongoDbBlogResult.isMembership
    }
    return blogForOutput
  }

}

