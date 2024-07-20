import { blogsCollection } from "../db/mongo-db"
import { BlogViewModel } from "../models/BlogViewModel";
import { BlogDBViewModel, PostDBViewModel } from "../models/DBModel";
import { PostViewModel } from "../models/PostViewModel";

export const blogsQueryRepository = {
  async getBlogs(searchNameTerm: string): Promise<BlogViewModel[]> {
    if(!searchNameTerm){
      const blogsMongoDbResult = await blogsCollection.find({}).toArray();
      return blogsMongoDbResult.map((blog: BlogDBViewModel) => this.mapBlogResult(blog));
    } else {
      const blogsMongoDbResult = await blogsCollection.find({ name: { $regex: new RegExp(searchNameTerm, 'i') } }).toArray();
      return blogsMongoDbResult.map((blog: BlogDBViewModel) => this.mapBlogResult(blog));
    }
 
  },


  
  mapBlogResult(blog: BlogDBViewModel): BlogViewModel {
    const blogForOutput: BlogViewModel = {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
      items: blog.items.map(this.mapPostResult)
    }
    return blogForOutput
  },

 mapPostResult(post: PostDBViewModel): PostViewModel {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt
    };
  }

}

