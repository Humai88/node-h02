export interface PostDBType {

}

export interface BlogDBType {

}


export type DBType = {
  posts: PostDBType[]
  blogs: BlogDBType[]
}
