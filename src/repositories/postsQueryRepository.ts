import { PostViewModel } from "../models/PostViewModel"
import { PostDBViewModel } from "../models/DBModel";
import { postsCollection } from "../db/mongo-db";
import { PaginatorPostViewModel, QueryPostModel } from "../models/QueryModel";

export const postsQueryRepository = {

  async getPosts(query: QueryPostModel, blogId?: string): Promise<PaginatorPostViewModel> {
    const postsMongoDbResult = await postsCollection.find(this.setFilter(blogId))
      .sort(query.sortBy, query.sortDirection)
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray()
    return this.mapBlogToPaginatorResult(postsMongoDbResult, query, blogId)
  },

  setFilter(blogId?: string) {
    if (!blogId) {
      return {};
    }
    return {blogId: blogId}
  },

  async setTotalCount(filter: any): Promise<number> {
    const totalCount = await postsCollection.countDocuments(filter)
    return totalCount
  },

  async mapBlogToPaginatorResult(posts: PostDBViewModel[], query: QueryPostModel, blogId?: string,): Promise<PaginatorPostViewModel> {
    const totalCount: number = await this.setTotalCount(this.setFilter(blogId))
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