import { ObjectId } from "mongodb";
import { blogsCollection } from "../db/mongo-db"
import { BlogViewModel } from "../models/BlogViewModel";
import { BlogDBViewModel, PostDBViewModel } from "../models/DBModel";
import { PostViewModel } from "../models/PostViewModel";
import { PaginatorBlogViewModel, QueryBlogModel } from "../models/QueryModel";

export const blogsQueryRepository = {
  async getBlogs(query: QueryBlogModel): Promise<PaginatorBlogViewModel> {
    const blogsMongoDbResult = await blogsCollection.find(this.setFilter(query))
      .sort(query.sortBy, query.sortDirection)
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray()
    return this.mapBlogToPaginatorResult(blogsMongoDbResult, query)
  },

  async getPostsInBlog(id: string): Promise<PostViewModel[] | null> {
    const objectId = new ObjectId(id);
    const blogMongoDbResult: BlogDBViewModel | null = await blogsCollection.findOne({ _id: objectId })
    return blogMongoDbResult && blogMongoDbResult.items.map((post: PostDBViewModel) => this.mapPostResult(post))
  },

  setFilter(query: QueryBlogModel) {
    const search = query.searchNameTerm
      ? { name: { $regex: query.searchNameTerm, $options: 'i' } }
      : {}
    return {
      ...search,
    }
  },

  async setTotalCount(filter: any): Promise<number> {
    const totalCount = await blogsCollection.countDocuments(filter)
    return totalCount
  },

  async mapBlogToPaginatorResult(items: BlogDBViewModel[], query: QueryBlogModel): Promise<PaginatorBlogViewModel> {
    const totalCount: number = await this.setTotalCount(this.setFilter(query))
    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: items.map(blog => this.mapBlogResult(blog))
    }
  },

  mapBlogResult(blog: BlogDBViewModel): BlogViewModel {
    const blogForOutput: BlogViewModel = {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
      items: blog.items.map(item => this.mapPostResult(item))
    }
    return blogForOutput
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

