import { db } from "../db/db"
import { PostDBType } from "../models/DBModel"
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"

 
// export const postRepository = {
//   async create(input: PostInputModel): Promise<{error?: string, id?: number}> {
//       const newPost: PostDBType = {
//           ...input,
//           id: Date.now() + Math.random(),
//           // ...
//       }

//       try {
//           db.posts = [...db.posts, newPost]
//       } catch (e) {
//           // log
//           return {error: e.message}
//       }

//       return {id: newPost.id}
//   },
//   async find(id: number): Promise<PostDBType> {
//       return db.posts.find(p => p.id === id)
//   },
//   async findForOutput(id: number): Promise<null | PostViewModel> {
//       const post = await this.find(id)
//       if (!post) { return null }
//       return this.mapToOutput(post)

//   },
//   mapToOutput(post: PostDBType): PostViewModel {
//       return {
//           id: post.id,
//           title: post.title,
//       }
//   }
// }