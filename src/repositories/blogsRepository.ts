import { db } from "../db/db"
import { BlogInputModel } from "../models/BlogInputModel"
import { BlogViewModel } from "../models/BlogViewModel"

export const BlogsRepository = {
  getBlogs() {
    return db.blogs
  },


  findBlog(id: string) {
    const blog: BlogViewModel = db.blogs.find(blog  => blog.id === id) as BlogViewModel
    if (!blog) {
      return false
    } else {
      return blog
    }
  },

  createBlog(blog: BlogInputModel) {
    const newBlog: BlogViewModel = {
      ...blog,
      id: String(Date.now() + Math.random())
    }
    db.blogs = [...db.blogs, newBlog]
    return newBlog
  },

  updateBlog(id: string, blog: BlogInputModel) {
    let blogToUpdate = db.blogs.find(blog => blog.id === id) as BlogViewModel;
    if (blogToUpdate) {
      blogToUpdate = {
        ...blog,
        id
      }
      db.blogs = db.blogs.map(blog => blog.id === id ? blogToUpdate : blog)
      return true
    } else {
      return false
    }

  },

  deleteBlog(id: string) {
    let blogToDelete = db.blogs.find(blog => blog.id === id) as BlogViewModel;
    if (blogToDelete) {
      db.blogs = db.blogs.filter(blog => blog.id !== id)
      return true
    } else {
      return false
    }

  },

}