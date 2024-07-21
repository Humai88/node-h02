import { PostViewModel } from "../models/PostViewModel"
import { PostDBViewModel } from "../models/DBModel";
import { postsCollection } from "../db/mongo-db";
import { QueryModel } from "../models/QueryModel";
import { ObjectId } from "mongodb";

export const postsQueryRepository = {

  async getPosts(): Promise<PostViewModel[]> {
    const postsMongoDbResult = await postsCollection.find({}).toArray();
    return postsMongoDbResult.map((blog: PostDBViewModel) => this.mapPostResult(blog));
  },

  setFilter(query: QueryModel) {
    const byId = query.blogId
      ? { blogId: new ObjectId(query.blogId) }
      : {}
    const search = query.searchNameTerm
      ? { title: { $regex: query.searchNameTerm, $options: 'i' } }
      : {}
    return {
      ...byId,
      ...search,
      _id: { $in: byId }
    }
  },

  async setTotalCount(filter: any): Promise<number> {
    const totalCount = await postsCollection.countDocuments(filter)
    return totalCount
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