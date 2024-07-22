import { PostInputModel } from "../models/PostInputModel"
import { PostsDBRepository } from "../repositories/postsDBRepository"

export const postsService = {

  async createPost(post: PostInputModel): Promise<string> {
    const postMongoDbResult = await PostsDBRepository.createPost(post)
    return postMongoDbResult._id.toString()
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    return PostsDBRepository.updatePost(id, post)
  },

  async deletePost(id: string): Promise<boolean> {
    return PostsDBRepository.deletePost(id)
  },


}
