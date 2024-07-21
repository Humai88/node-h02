import { PostViewModel } from "../models/PostViewModel"
import { PostDBViewModel } from "../models/DBModel";
import { postsCollection } from "../db/mongo-db";
import { PaginatorPostViewModel, QueryModel } from "../models/QueryModel";

export const postsQueryRepository = {

  async getPosts(query: QueryModel): Promise<PaginatorPostViewModel> {
    const blogsMongoDbResult = await postsCollection.find({})
      .sort(query.sortBy, query.sortDirection)
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray()
    return this.mapBlogToPaginatorResult(blogsMongoDbResult, query)
  },


  async mapBlogToPaginatorResult(posts: PostDBViewModel[], query: any): Promise<PaginatorPostViewModel> {
    const totalCount: number =  await postsCollection.countDocuments({})
    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: posts.map(post => this.mapPostResult(post))
    }
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