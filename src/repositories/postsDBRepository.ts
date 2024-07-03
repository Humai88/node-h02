import { blogsCollection, postsCollection } from "../db/mongo-db"
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"
import { BlogsDBRepository } from "./blogsDBRepository"


export const PostsDBRepository = {
  async getPosts(): Promise<PostViewModel[]> {
    return postsCollection.find({}).toArray()
  },

  async findPost(id: string): Promise<PostViewModel | null> {
    const post: PostViewModel | null = await postsCollection.findOne({ id: id })
    if (!post) {
      return null
    } else {
      return post
    }
  },

  async createPost(post: PostInputModel): Promise<PostViewModel> {
    const blog = await BlogsDBRepository.findBlog(post.blogId)
    const newPost: PostViewModel = {
      ...post,
      createdAt: new Date().toISOString(),
      id: String(Date.now() + Math.random()),
      blogName: blog?.name ? blog.name : ''
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