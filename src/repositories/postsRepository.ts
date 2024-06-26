import { db } from "../db/db"
import { PostInputModel } from "../models/PostInputModel"
import { PostViewModel } from "../models/PostViewModel"


export const PostsRepository = {
  getPosts() {
    return db.posts
  },

  findPost(id: string) {
    const post = db.posts.find(post => post.id === id) as PostViewModel
    if (!post) {
      return false
    } else {
      return post
    }
  },

  createPost(post: PostInputModel) {
    const newPost: PostViewModel = {
      ...post,
      id: String(Date.now() + Math.random()),
      blogName: db.blogs.find(blog => blog.id === post.blogId)?.name as string
    }
    db.posts = [...db.posts, newPost]
    return newPost
  },

  updatePost(id: string, post: PostInputModel) {
    let postToUpdate = db.posts.find(post => post.id === id) as PostViewModel;
    if (postToUpdate) {
      postToUpdate = {
        ...post,
        id,
        blogName: db.blogs.find(blog => blog.id === post.blogId)?.name as string
      }
      db.posts = db.posts.map(post => post.id === id ? postToUpdate : post)
      return true
    } else {
      return false
    }

  },

  deletePost(id: string) {
    let blogToDelete = db.posts.find(post => post.id === id) as PostViewModel;
    if (blogToDelete) {
      db.posts = db.posts.filter(post => post.id !== id)
      return true
    } else {
      return false
    }

  },

}