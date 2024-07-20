import { PostViewModel } from "../models/PostViewModel"
import { PostsDBRepository } from "./postsDBRepository";
import { PostDBViewModel } from "../models/DBModel";

export const PostsQueryRepository = {
  async getPosts(): Promise<PostViewModel[]> {
    const postsMongoDbResult = await PostsDBRepository.getPosts()
    return postsMongoDbResult.map((blog: PostDBViewModel) => this.mapPostResult(blog));
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