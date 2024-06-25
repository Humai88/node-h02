import { DBType } from "../models/DBModel"


export const db: DBType = {
  posts: [],
  blogs: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { 
      db.posts = []
      db.blogs = []
      return
  }

  db.posts = dataset.posts || db.posts
}