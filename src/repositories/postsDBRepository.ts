import { ObjectId, WithId } from "mongodb";
import {  blogsCollection, postsCollection } from "../db/mongo-db"
import { BlogViewModel } from "../models/BlogViewModel";
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"
import { v4  } from 'uuid';

export const PostsDBRepository = {
  async getPosts(): Promise<PostViewModel[]> {
    const postsMongoDbResult = await postsCollection.find({}).toArray();
    return postsMongoDbResult.map((blog: WithId<PostViewModel>) => this.mapResult(blog));
  },

  async findPost(id: string): Promise<PostViewModel | null> {
    const post: WithId<PostViewModel> | null = await postsCollection.findOne({ id: id })
    if (!post) {
      return null
    } else {
      return this.mapResult(post)
    }
  },

  async createPost(post: PostInputModel): Promise<PostViewModel> {
    const blog: BlogViewModel | null = await blogsCollection.findOne({ id: post.blogId })
    const newPost: WithId<PostViewModel> = {
      ...post,
      createdAt: new Date().toISOString(),
      id: v4(),
      blogName: blog?.name ? blog.name : '',
      _id: new ObjectId(),
    }
    await postsCollection.insertOne(newPost)
    return this.mapResult(newPost)
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    const result = await postsCollection.updateOne({ id: id }, { $set: { title: post.title, blogId: post.blogId, content: post.content, shortDescription: post.shortDescription } })
    return result.matchedCount === 1
  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },

  mapResult(mongoDbPostResult: WithId<PostViewModel>): PostViewModel {
    const postForOutput: PostViewModel = {
      id: mongoDbPostResult.id,
      title: mongoDbPostResult.title,
      blogId: mongoDbPostResult.blogId,
      content: mongoDbPostResult.content,
      shortDescription: mongoDbPostResult.shortDescription,
      createdAt: mongoDbPostResult.createdAt,
      blogName: mongoDbPostResult.blogName
    }
    return postForOutput
  }

}