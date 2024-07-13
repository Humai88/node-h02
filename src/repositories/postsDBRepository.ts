import { ObjectId, WithId } from "mongodb";
import { blogsCollection, postsCollection } from "../db/mongo-db"
import { BlogViewModel } from "../models/BlogViewModel";
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"

export const PostsDBRepository = {
  async getPosts(): Promise<WithId<PostViewModel>[]> {
    const postsMongoDbResult = await postsCollection.find({}).toArray();
    return postsMongoDbResult
  },

  async findPost(id: string): Promise<WithId<PostViewModel> | null> {
    const post: WithId<PostViewModel> | null = await postsCollection.findOne({ id: id })
    return post
  },

  async createPost(post: PostInputModel): Promise<WithId<PostViewModel>> {
    const blog: BlogViewModel | null = await blogsCollection.findOne({ id: post.blogId })
    const objectId = new ObjectId();
    const newPost: WithId<PostViewModel> = {
      ...post,
      createdAt: new Date().toISOString(),
      blogName: blog?.name ? blog.name : '',
      id: objectId.toHexString(),
      _id: objectId,
    }
    await postsCollection.insertOne(newPost)
    return newPost
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    const result = await postsCollection.updateOne({ id: id }, { $set: { title: post.title, blogId: post.blogId, content: post.content, shortDescription: post.shortDescription } })
    return result.matchedCount === 1
  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount === 1
  },

}