import { blogsCollection } from "../db/mongo-db"
import { BlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"
import { v4  } from 'uuid';

export const BlogsDBRepository = {
  async getBlogs(): Promise<BlogViewModel[]> {
    return blogsCollection.find({}).toArray()
  },

  async findBlog(id: string): Promise<BlogViewModel | null> {
    const blog: BlogViewModel | null = await blogsCollection.findOne({ id: id })
    if (!blog) {
      return null
    } else {
      return blog
    }
  },

  async createBlog(blog: BlogInputModel): Promise<BlogViewModel> {
    const newBlog: BlogViewModel = {
      ...blog,
      isMembership: false,
      createdAt: new Date().toISOString(),
      id: v4()
    }
    await blogsCollection.insertOne(newBlog)
    return newBlog
  },

  async updateBlog(id: string, blog: BlogInputModel): Promise<boolean> {
    const result = await blogsCollection.updateOne({ id: id }, { $set: { name: blog.name, websiteUrl: blog.websiteUrl, description: blog.description} })
    return result.matchedCount === 1
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },

}