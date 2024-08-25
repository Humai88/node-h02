import { ObjectId } from "mongodb"
import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"
import { CommentatorInfoModel } from "./CommentModel"

export type DBModel = {
  posts: PostViewModel[]
  blogs: BlogViewModel[]
  comments: CommentDBViewModel[]
  users: UserDBViewModel[]
}

export interface BlogDBViewModel {
  _id: ObjectId,
  name: string,
  description: string,
  websiteUrl: string,
  createdAt: string,
  isMembership: boolean,
}

export interface PostDBViewModel {
  _id: ObjectId
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
}

export interface UserDBViewModel {
  _id: ObjectId,
  login: string,
  email: string,
  createdAt: string,
  passwordHash: string,
  passwordSalt: string
}

export interface CommentDBViewModel {
  _id: ObjectId,
  content: string,
  createdAt: string,  
  commentatorInfo: CommentatorInfoModel,
  postId: string
}
