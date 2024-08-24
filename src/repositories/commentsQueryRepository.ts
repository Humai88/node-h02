import { ObjectId } from "mongodb";
import { commentsCollection, usersCollection } from "../db/mongo-db"
import { CommentDBViewModel, UserDBViewModel } from "../models/DBModel";
import { PaginatorUserViewModel, QueryUserModel } from "../models/QueryModel";
import { UserViewModel } from "../models/UserModel";
import { CommentViewModel } from "../models/CommentModel";


export const commentsQueryRepository = {

  // async getUsers(query: QueryUserModel): Promise<PaginatorUserViewModel> {
  //   const usersMongoDbResult = await usersCollection.find(this.setFilter(query))
  //     .sort(query.sortBy, query.sortDirection)
  //     .skip((query.pageNumber - 1) * query.pageSize)
  //     .limit(query.pageSize)
  //     .toArray()
  //   return this.mapUserToPaginatorResult(usersMongoDbResult, query)
  // },

  async findComment(id: string): Promise<CommentViewModel | null> {
    const objectId = new ObjectId(id);
    const comment = await commentsCollection.findOne({ _id: objectId })
    return comment && this.mapCommentResult(comment)
  },


  // setFilter(query: QueryUserModel) {
  //     return {
  //       $or: [
  //         query.searchLoginTerm
  //         ? { login: { $regex: query.searchLoginTerm, $options: 'i' } }
  //         : {},
  //         query.searchEmailTerm
  //     ? { email: { $regex: query.searchEmailTerm, $options: 'i' } }
  //     : {}
  //       ]
  //     };
  // },

  // async setTotalCount(filter: any): Promise<number> {
  //   const totalCount = await usersCollection.countDocuments(filter)
  //   return totalCount
  // },

  // async mapUserToPaginatorResult(items: UserDBViewModel[], query: QueryUserModel): Promise<PaginatorUserViewModel> {
  //   const totalCount: number = await this.setTotalCount(this.setFilter(query))
  //   return {
  //     pagesCount: Math.ceil(totalCount / query.pageSize),
  //     page: query.pageNumber,
  //     pageSize: query.pageSize,
  //     totalCount,
  //     items: items.map(user => this.mapUserResult(user))
  //   }
  // },

  mapCommentResult(comment: CommentDBViewModel): CommentViewModel {
    const commentForOutput: CommentViewModel = {
      id: comment._id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,  
      commentatorInfo: {  
        userId: comment.commentatorInfo.userId,
        userLogin: comment.commentatorInfo.userLogin
      }
    }
    return commentForOutput
  },

}

