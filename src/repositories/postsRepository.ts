import { db } from "../db/db"
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"


// export const postRepository = {
//   async createPost(input: PostInputModel): Promise<{ error?: string, id?: number }> {
//     const newPost: PostViewModel = {
//       ...input,
//       id: String(Date.now() + Math.random()),
//       // ...
//     }

//     try {
//       db.posts = [...db.posts, newPost]
//     } catch (e) {
//       // log
//       return { error: e.message }
//     }

//     return { id: newPost.id }
//   },
//   async findPost(id: number): Promise<PostViewModel> {
//     return db.posts.find(p => p.id === id)
//   },
//   async findForOutput(id: number): Promise<null | PostViewModel> {
//     const post = await this.find(id)
//     if (!post) { return null }
//     return this.mapToOutput(post)

//   },
//   mapToOutput(post: PostViewModel): PostViewModel {
//     return {
//       id: post.id,
//       title: post.title,
//     }
//   }
// }