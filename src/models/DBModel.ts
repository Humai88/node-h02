import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"

export type DBModel = {
  posts: PostViewModel[]
  blogs: BlogViewModel[]
}
