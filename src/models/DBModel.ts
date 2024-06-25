import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"

export type DBType = {
  posts: PostViewModel[]
  blogs: BlogViewModel[]
}
