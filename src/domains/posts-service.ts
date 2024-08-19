import { PostInputModel } from "../models/PostInputModel"
import { postsDBRepository } from "../repositories/postsDBRepository"

export const postsService = {

  async createPost(post: PostInputModel): Promise<string> {
    const postMongoDbResult = await postsDBRepository.createPost(post)
    return postMongoDbResult._id.toString()
  },

  async updatePost(id: string, post: PostInputModel): Promise<boolean> {
    return postsDBRepository.updatePost(id, post)
  },

  async deletePost(id: string): Promise<boolean> {
    return postsDBRepository.deletePost(id)
  },


}
