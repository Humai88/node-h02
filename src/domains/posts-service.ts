import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"
import { PostsDBRepository } from "../repositories/postsDBRepository"
import { PostDBViewModel } from "../models/DBModel";

export const postsService = {

  async findPost(id: string): Promise<PostViewModel | null> {
    const postMongoDbResult = await PostsDBRepository.findPost(id)
    return postMongoDbResult && this.mapPostResult(postMongoDbResult)
  },

  async createPost(post: PostInputModel): Promise<PostViewModel> {
    const postMongoDbResult = await PostsDBRepository.createPost(post)
    return this.mapPostResult(postMongoDbResult)
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    return PostsDBRepository.updatePost(id, post)
  },

  async deletePost(id: string): Promise<boolean> {
    return PostsDBRepository.deletePost(id)
  },

  mapPostResult(mongoDbPostResult: PostDBViewModel): PostViewModel {
    const postForOutput: PostViewModel = {
      id: mongoDbPostResult._id.toString(),
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
