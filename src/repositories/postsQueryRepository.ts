import { PostViewModel } from "../models/PostViewModel"
import { PostDBViewModel } from "../models/DBModel";
import { postsCollection } from "../db/mongo-db";

export const postsQueryRepository = {

  async getPosts(): Promise<PostViewModel[]> {
    const postsMongoDbResult = await postsCollection.find({}).toArray();
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