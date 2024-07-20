import { ObjectId} from "mongodb";
import { blogsCollection, postsCollection } from "../db/mongo-db"
import { PostInputModel } from "../models/PostInputModel"
import { BlogDBViewModel, PostDBViewModel } from "../models/DBModel";

export const PostsDBRepository = {
  async getPosts(): Promise<PostDBViewModel[]> {
    const postsMongoDbResult = await postsCollection.find({}).toArray();
    return postsMongoDbResult
  },

  async findPost(id: string): Promise<PostDBViewModel | null> {
    const objectId = new ObjectId(id);
    const post: PostDBViewModel | null = await postsCollection.findOne({ _id: objectId })
    return post
  },

  async createPost(post: PostInputModel): Promise<PostDBViewModel> {
    const objectPostId = new ObjectId(post.blogId);
    const blog: BlogDBViewModel | null = await blogsCollection.findOne({ _id: objectPostId })
    const objectId = new ObjectId();
    const newPost: PostDBViewModel = {
      ...post,
      createdAt: new Date().toISOString(),
      blogName: blog?.name ? blog.name : '',
      _id: objectId,
    }
    await postsCollection.insertOne(newPost)
    return newPost
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    const objectId = new ObjectId(id);
    const result = await postsCollection.updateOne({ _id: objectId }, { $set: { title: post.title, blogId: post.blogId, content: post.content, shortDescription: post.shortDescription } })
    return result.matchedCount === 1
  },

  async deletePost(id: string): Promise<boolean> {
    const objectId = new ObjectId(id);
    const result = await postsCollection.deleteOne({ _id: objectId });
    return result.deletedCount === 1
  },

}