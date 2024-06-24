import { DBType } from "../models/DBModel"


export const db: DBType = {
  posts: [],
  blogs: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { 
      db.posts = []
      return
  }

  db.posts = dataset.posts || db.posts
}