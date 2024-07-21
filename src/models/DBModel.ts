import { ObjectId } from "mongodb"
import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"

export type DBModel = {
  posts: PostViewModel[]
  blogs: BlogViewModel[]
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