import { WithId } from "mongodb";
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"

import { PostsDBRepository } from "../repositories/postsDBRepository"

export const PostsService = {
  async getPosts(): Promise<PostViewModel[]> {
    const postsMongoDbResult = await PostsDBRepository.getPosts()
    return postsMongoDbResult.map((blog: WithId<PostViewModel>) => this.mapResult(blog));
  },

  async findPost(id: string): Promise<PostViewModel | null> {
    const postMongoDbResult = await PostsDBRepository.findPost(id)
    return postMongoDbResult && this.mapResult(postMongoDbResult)
  },

  async createPost(post: PostInputModel): Promise<PostViewModel> {
    const postMongoDbResult = await PostsDBRepository.createPost(post)
    return this.mapResult(postMongoDbResult)
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    return PostsDBRepository.updatePost(id, post)
  },

  async deletePost(id: string): Promise<boolean> {
    return PostsDBRepository.deletePost(id)
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