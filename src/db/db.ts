import { DBModel } from "../models/DBModel"


export const db: DBModel = {
  posts: [],
  blogs: []
}

export const setDB = (dataset?: Partial<DBModel>) => {
  if (!dataset) { 
      db.posts = []
      db.blogs = []
      return
  }

  db.posts = dataset.posts || db.posts
}