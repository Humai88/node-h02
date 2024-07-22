import { BlogInputModel, PostInBlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"
import { ObjectId } from "mongodb";
import { blogsDBRepository } from "../repositories/blogsDBRepository"
import { PostViewModel } from "../models/PostViewModel";
import { BlogDBViewModel, PostDBViewModel } from "../models/DBModel";

export const blogsService = {

  async createBlog(blog: BlogInputModel): Promise<string> {
    const objectId = new ObjectId();
    const newBlog: BlogDBViewModel = {
      ...blog,
      isMembership: false,
      createdAt: new Date().toISOString(),
      _id: objectId,
    }
    const blogMongoDbResult = await blogsDBRepository.createBlog(newBlog);
    return blogMongoDbResult._id.toString()
  },

  async createPostInBlog(id: string, post: PostInBlogInputModel): Promise<string> {
    const postMongoDbResult = await blogsDBRepository.createPostInBlog(id, post)
    return postMongoDbResult._id.toString()
  },

  async updateBlog(id: string, blog: BlogInputModel): Promise<boolean> {
    return blogsDBRepository.updateBlog(id, blog)
  },

  async deleteBlog(id: string): Promise<boolean> {
    return blogsDBRepository.deleteBlog(id)
  },

  mapBlogResult(blog: BlogDBViewModel): BlogViewModel {
    const blogForOutput: BlogViewModel = {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    }
    return blogForOutput
  },

}

