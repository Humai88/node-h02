import { BlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"
import { ObjectId, WithId } from "mongodb";
import { BlogsDBRepository } from "../repositories/blogsDBRepository"

export const BlogsService = {
  async getBlogs(): Promise<BlogViewModel[]> {
    const blogsMongoDbResult = await BlogsDBRepository.getBlogs()
    return blogsMongoDbResult.map((blog: WithId<BlogViewModel>) => this.mapResult(blog));
  },

  async findBlog(id: string): Promise<BlogViewModel | null> {
    const blogMongoDbResult = await BlogsDBRepository.findBlog(id)
    return blogMongoDbResult && this.mapResult(blogMongoDbResult)
  },

  async createBlog(blog: BlogInputModel): Promise<BlogViewModel> {
    const objectId = new ObjectId();
    const newBlog: WithId<BlogViewModel> = {
      ...blog,
      isMembership: false,
      createdAt: new Date().toISOString(),
      id: objectId.toHexString(),
      _id: objectId,
    }
    const insertResult = await BlogsDBRepository.createBlog(newBlog);

    if (!insertResult.acknowledged) {
      throw new Error('Blog creation failed');
    }

    const createdBlog: WithId<BlogViewModel> = {
      ...newBlog,
      id: insertResult.insertedId.toString(),
      _id: new ObjectId(insertResult.insertedId),
    };

    return this.mapResult(createdBlog);
  },

  async updateBlog(id: string, blog: BlogInputModel): Promise<boolean> {
    return BlogsDBRepository.updateBlog(id, blog)
  },

  async deleteBlog(id: string): Promise<boolean> {
    return BlogsDBRepository.deleteBlog(id)
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

