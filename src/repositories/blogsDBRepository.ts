import { blogsCollection } from "../db/mongo-db"
import { BlogInputModel, PostInBlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"
import { InsertOneResult, ObjectId,  WithId } from "mongodb";
import { PostViewModel } from "../models/PostViewModel";

export const BlogsDBRepository = {
  async getBlogs(): Promise<WithId<BlogViewModel>[]> {
    const blogsMongoDbResult = await blogsCollection.find({}).toArray();
    return blogsMongoDbResult
  },

  async findBlog(id: string): Promise<WithId<BlogViewModel> | null> {
    const blog: WithId<BlogViewModel> | null = await blogsCollection.findOne({ id: id })
    return blog
  },

  async createBlog(blog: WithId<BlogViewModel>): Promise<InsertOneResult<BlogViewModel>> {
    const newBlog = await blogsCollection.insertOne(blog)
    return newBlog
  },

  async createPostInBlog(id: string, post: PostInBlogInputModel): Promise<WithId<PostViewModel>> {
    const blog: WithId<BlogViewModel> | null = await blogsCollection.findOne({ id: id })
    const objectId = new ObjectId();
    const newPost = {
      ...post,
      createdAt: new Date().toISOString(),
      id: objectId.toHexString(),
      _id: objectId,
      blogName: blog?.name ? blog.name : '',
      blogId: id
    }

    blog && blog.items.push(newPost)
    await blogsCollection.updateOne({ id: id }, { $set: { items: blog?.items } })
    return newPost

  },

  async updateBlog(id: string, blog: BlogInputModel): Promise<boolean> {
    const result = await blogsCollection.updateOne({ id: id }, { $set: { name: blog.name, websiteUrl: blog.websiteUrl, description: blog.description } })
    return result.matchedCount === 1
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },

}

